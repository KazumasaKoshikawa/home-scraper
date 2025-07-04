// Viteの型定義をインポート
/// <reference types="vite/client" />

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { Property } from "../components/List";
import { FilterState } from "../components/Filter";
// Viteの型定義をインポートしてimport.meta.envの型エラーを防ぐ

interface contextType {
  properties: Property[];
  filtered: Property[];
  setFiltered: React.Dispatch<React.SetStateAction<Property[]>>;
  filterState: FilterState;
  handleFilter: () => void;
  handleReset: () => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

const context = createContext<contextType | undefined>(undefined);

export const useAppContext = () => {
  const ctx = React.useContext(context);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};

// JSON→Property型変換用
function mapJsonToProperty(item: any, idx: number): Property {
  // 金額系のパース関数
  const parseYen = (v: string | null) => {
    if (!v || v === "-" || v === null) return undefined;
    // 例: "8万円" → 80000, "2000円" → 2000
    if (v.includes("万円")) return parseFloat(v.replace("万円", "")) * 10000;
    if (v.includes("円")) return parseFloat(v.replace("円", ""));
    return Number(v) || undefined;
  };
  // 面積
  const parseArea = (v: string | null) => {
    if (!v || v === "-" || v === null) return undefined;
    return parseFloat(v.replace("m2", ""));
  };
  // 築年数
  const parseAge = (v: string | null) => v || "-";
  // 階
  const parseFloor = (v: string | null) => v || "-";

  return {
    id: idx + 1,
    name: item["物件名"] ?? "-",
    address: item["所在地"] ?? "-",
    rent_min: parseYen(item["賃料"]),
    rent_max: parseYen(item["賃料"]), // 上限下限区別不可のため同値
    layout: item["間取り"] ?? "-",
    area_min: parseArea(item["専有面積"]),
    area_max: parseArea(item["専有面積"]),
    building_type: item["建物種別"] ?? "-",
    building_age: parseAge(item["築年数"]),
    floor: parseFloor(item["階"]),
    admin_fee_min: parseYen(item["管理費・共益費"]),
    deposit: parseYen(item["敷金"]),
    key_money: parseYen(item["礼金"]),
    url: item["url"] ?? "#",
    stations: Array.isArray(item["最寄駅"]) ? item["最寄駅"] : [],
  };
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [rentRange, setRentRange] = useState<number[]>([0, 500000]);
  const [layout, setLayout] = useState<string[]>([]);
  const [areaRange, setAreaRange] = useState<number[]>([0, 200]);
  const [buildingType, setBuildingType] = useState<string[]>([]);
  const [buildingAgeRange, setBuildingAgeRange] = useState<number[]>([0, 100]);
  const [address, setAddress] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const filterState: FilterState = {
    rentRange,
    setRentRange,
    layout,
    setLayout,
    areaRange,
    setAreaRange,
    buildingType,
    setBuildingType,
    buildingAgeRange,
    setBuildingAgeRange,
    address,
    setAddress,
    pageSize,
    setPageSize,
  };

  useEffect(() => {
    // TODO 静的データ読み込み
    // Viteのbase設定に応じて正しいパスでstatic_data.jsonを取得するため、
    // import.meta.env.BASE_URLを使うことでローカル・本番どちらでも動作します。
    fetch(import.meta.env.BASE_URL + "static_data.json")
      .then((res) => res.json())
      .then((data: any[]) => {
        const mapped = data.map(mapJsonToProperty);
        setProperties(mapped);
        setFiltered(mapped);
      });
  }, []);

  const handleFilter = () => {
    setFiltered(
      properties.filter((p) => {
        // 家賃
        if (
          p.rent_min === undefined ||
          p.rent_max === undefined ||
          !(p.rent_min >= rentRange[0] && p.rent_max <= rentRange[1])
        )
          return false;
        // 間取り（複数選択対応）
        if (layout.length > 0 && !layout.includes(p.layout)) return false;
        // 面積
        if (
          p.area_min === undefined ||
          p.area_max === undefined ||
          !(p.area_min >= areaRange[0] && p.area_max <= areaRange[1])
        )
          return false;
        // 建物種別（複数選択対応）
        if (buildingType.length > 0 && !buildingType.includes(p.building_type))
          return false;
        // 築年数
        const getAge = (str: string) =>
          parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
        const age = getAge(p.building_age);
        if (!(age >= buildingAgeRange[0] && age <= buildingAgeRange[1]))
          return false;
        if (address) {
          const keyword = address.trim();
          if (!p.address.includes(keyword) && !p.name.includes(keyword))
            return false;
        }
        return true;
      })
    );
    setPage(1);
  };

  const handleReset = () => {
    setRentRange([0, 500000]);
    setLayout([]);
    setAreaRange([0, 200]);
    setBuildingType([]);
    setBuildingAgeRange([0, 100]);
    setAddress("");
    setFiltered(properties);
    setPage(1);
  };

  return (
    <context.Provider
      value={{
        properties,
        filtered,
        setFiltered,
        filterState,
        handleFilter,
        handleReset,
        page,
        setPage,
        pageSize,
        setPageSize,
      }}
    >
      {children}
    </context.Provider>
  );
};

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { Property } from "../components/HomeList";
import { FilterState } from "../components/FilterBar";

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

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [rentFrom, setRentFrom] = useState<string>("");
  const [rentTo, setRentTo] = useState<string>("");
  const [layout, setLayout] = useState<string>("");
  const [areaFrom, setAreaFrom] = useState<string>("");
  const [areaTo, setAreaTo] = useState<string>("");
  const [buildingType, setBuildingType] = useState<string>("");
  const [buildingAgeFrom, setBuildingAgeFrom] = useState<string>("");
  const [buildingAgeTo, setBuildingAgeTo] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const filterState: FilterState = {
    rentFrom,
    setRentFrom,
    rentTo,
    setRentTo,
    layout,
    setLayout,
    areaFrom,
    setAreaFrom,
    areaTo,
    setAreaTo,
    buildingType,
    setBuildingType,
    buildingAgeFrom,
    setBuildingAgeFrom,
    buildingAgeTo,
    setBuildingAgeTo,
    address,
    setAddress,
    pageSize,
    setPageSize,
  };

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/static_data.json")
      .then((res) => res.json())
      .then((data: Property[]) => {
        setProperties(data);
        setFiltered(data);
      });
  }, []);

  const handleFilter = () => {
    setFiltered(
      properties.filter((p) => {
        const from = rentFrom ? parseInt(rentFrom, 10) : -Infinity;
        const to = rentTo ? parseInt(rentTo, 10) : Infinity;
        if (!(p.rent_min >= from && p.rent_max <= to)) return false;
        if (layout && p.layout !== layout) return false;
        const areaMin = areaFrom ? parseFloat(areaFrom) : -Infinity;
        const areaMax = areaTo ? parseFloat(areaTo) : Infinity;
        if (!(p.area_min >= areaMin && p.area_max <= areaMax)) return false;
        if (buildingType && p.building_type !== buildingType) return false;
        const getAge = (str: string) =>
          parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
        const age = getAge(p.building_age);
        const ageFrom = buildingAgeFrom
          ? parseInt(buildingAgeFrom, 10)
          : -Infinity;
        const ageTo = buildingAgeTo ? parseInt(buildingAgeTo, 10) : Infinity;
        if (!(age >= ageFrom && age <= ageTo)) return false;
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
    setRentFrom("");
    setRentTo("");
    setLayout("");
    setAreaFrom("");
    setAreaTo("");
    setBuildingType("");
    setBuildingAgeFrom("");
    setBuildingAgeTo("");
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

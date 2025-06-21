import React, { useEffect, useState } from "react";
import FilterBar, { FilterState } from "./components/FilterBar.tsx";
import PropertyTable, { Property } from "./components/PropertyTable.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// MUIアイコンの例: import SearchIcon from '@mui/icons-material/Search';

// Apple風カラーパレット・角丸・フォントをカスタムしたMUIテーマ
const theme = createTheme({
  palette: {
    primary: { main: "#007AFF" },
    background: { default: "#F5F5F7", paper: "#fff" },
    text: { primary: "#1D1D1F", secondary: "#666" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
    h1: { fontSize: 34, fontWeight: 700 },
  },
});

const App: React.FC = () => {
  // 物件データ全体
  const [properties, setProperties] = useState<Property[]>([]);
  // フィルタ後の物件データ
  const [filtered, setFiltered] = useState<Property[]>([]);
  // 各種フィルタ用のstate
  const [rentFrom, setRentFrom] = useState<string>("");
  const [rentTo, setRentTo] = useState<string>("");
  const [layout, setLayout] = useState<string>("");
  const [areaFrom, setAreaFrom] = useState<string>("");
  const [areaTo, setAreaTo] = useState<string>("");
  const [buildingType, setBuildingType] = useState<string>("");
  const [buildingAgeFrom, setBuildingAgeFrom] = useState<string>("");
  const [buildingAgeTo, setBuildingAgeTo] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  // まとめてFilterBarに渡すオブジェクト
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
  };

  // 初回マウント時に静的データを取得
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/static_data.json")
      .then((res) => res.json())
      .then((data: Property[]) => {
        setProperties(data);
        setFiltered(data);
      });
  }, []);

  // 検索・フィルタ処理
  const handleFilter = () => {
    setFiltered(
      properties.filter((p) => {
        // 家賃フィルタ
        const from = rentFrom ? parseInt(rentFrom, 10) : -Infinity;
        const to = rentTo ? parseInt(rentTo, 10) : Infinity;
        if (!(p.rent_min >= from && p.rent_max <= to)) return false;
        // 間取りフィルタ
        if (layout && p.layout !== layout) return false;
        // 面積フィルタ
        const areaMin = areaFrom ? parseFloat(areaFrom) : -Infinity;
        const areaMax = areaTo ? parseFloat(areaTo) : Infinity;
        if (!(p.area_min >= areaMin && p.area_max <= areaMax)) return false;
        // 建物種別フィルタ
        if (buildingType && p.building_type !== buildingType) return false;
        // 築年数フィルタ
        const getAge = (str: string) =>
          parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
        const age = getAge(p.building_age);
        const ageFrom = buildingAgeFrom
          ? parseInt(buildingAgeFrom, 10)
          : -Infinity;
        const ageTo = buildingAgeTo ? parseInt(buildingAgeTo, 10) : Infinity;
        if (!(age >= ageFrom && age <= ageTo)) return false;
        // 物件名・住所の部分一致フィルタ（どちらかにキーワードが含まれていればOK）
        if (address) {
          const keyword = address.trim();
          if (!p.address.includes(keyword) && !p.name.includes(keyword))
            return false;
        }
        return true;
      })
    );
  };

  // 検索リセット処理
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
    setFiltered(properties); // 全件表示に戻す
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* 中央寄せ・余白付きのApple風Container */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          {/* タイトル */}
          <Typography variant="h1">SUUMO賃貸一覧 by KK</Typography>
        </Box>
        {/* フィルタバー（filterStateをまとめて渡す） */}
        <FilterBar
          filterState={filterState}
          onFilter={handleFilter}
          onReset={handleReset}
        />
        {/* 物件リスト表示 */}
        <PropertyTable properties={filtered} />
      </Container>
    </ThemeProvider>
  );
};

export default App;

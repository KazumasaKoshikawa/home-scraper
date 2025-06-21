import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Slider,
  Typography,
} from "@mui/material";
import { useAppContext } from "../contexts/Context.tsx";
// MUIアイコンの例: import SearchIcon from '@mui/icons-material/Search';

export interface FilterState {
  rentRange: number[];
  setRentRange: (v: number[]) => void;
  layout: string;
  setLayout: (v: string) => void;
  areaRange: number[];
  setAreaRange: (v: number[]) => void;
  buildingType: string;
  setBuildingType: (v: string) => void;
  buildingAgeRange: number[];
  setBuildingAgeRange: (v: number[]) => void;
  address: string;
  setAddress: (v: string) => void;
  pageSize: number;
  setPageSize: (v: number) => void;
}

const layouts = ["", "1R", "1K", "1DK", "1LDK", "2DK", "2LDK", "3DK", "3LDK"];
const buildingTypes = ["", "マンション", "アパート"];

export function FilterBar() {
  const { filterState, handleFilter, handleReset } = useAppContext();
  const {
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
  } = filterState;

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1 }}>
        {/* 家賃スライダー */}
        <Box sx={{ width: 220 }}>
          <Typography gutterBottom>家賃範囲（円）</Typography>
          <Slider
            value={rentRange}
            onChange={(_, v) => setRentRange(v as number[])}
            valueLabelDisplay="auto"
            min={10000}
            max={100000}
            step={10000}
            valueLabelFormat={(v) => `¥${v.toLocaleString()}`}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">
              ¥{rentRange[0].toLocaleString()}
            </Typography>
            <Typography variant="body2">
              ¥{rentRange[1].toLocaleString()}
            </Typography>
          </Box>
        </Box>
        {/* 間取りセレクト */}
        <Select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          displayEmpty
          size="small"
          sx={{ minWidth: 110, bgcolor: "#fff", borderRadius: 1 }}
          renderValue={(selected) => selected || "間取り"}
        >
          <MenuItem value="" disabled hidden>
            間取り
          </MenuItem>
          {layouts
            .filter((l) => l)
            .map((l) => (
              <MenuItem key={l} value={l}>
                {l}
              </MenuItem>
            ))}
        </Select>
        {/* 面積スライダー */}
        <Box sx={{ width: 180 }}>
          <Typography gutterBottom>面積範囲（㎡）</Typography>
          <Slider
            value={areaRange}
            onChange={(_, v) => setAreaRange(v as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={80}
            step={1}
            valueLabelFormat={(v) => `${v}㎡`}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">{areaRange[0]}㎡</Typography>
            <Typography variant="body2">{areaRange[1]}㎡</Typography>
          </Box>
        </Box>
        {/* 建物種別セレクト */}
        <Select
          value={buildingType}
          onChange={(e) => setBuildingType(e.target.value)}
          displayEmpty
          size="small"
          sx={{ minWidth: 110, bgcolor: "#fff", borderRadius: 1 }}
          renderValue={(selected) => selected || "建物種別"}
        >
          <MenuItem value="" disabled hidden>
            建物種別
          </MenuItem>
          {buildingTypes
            .filter((t) => t)
            .map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
        </Select>
        {/* 築年数スライダー */}
        <Box sx={{ width: 160 }}>
          <Typography gutterBottom>築年数（年）</Typography>
          <Slider
            value={buildingAgeRange}
            onChange={(_, v) => setBuildingAgeRange(v as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={1}
            valueLabelFormat={(v) => `${v}年`}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">{buildingAgeRange[0]}年</Typography>
            <Typography variant="body2">{buildingAgeRange[1]}年</Typography>
          </Box>
        </Box>
        {/* キーワード検索 */}
        <TextField
          label="キーワード検索"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          size="small"
          sx={{ minWidth: 140 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        {/* 左側：検索・リセット */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            sx={{ minWidth: 100, borderRadius: 2 }}
          >
            検索
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleReset}
            sx={{ minWidth: 100, borderRadius: 2 }}
          >
            リセット
          </Button>
        </Box>
        {/* 右側：ページング件数選択 */}
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          size="small"
          sx={{ minWidth: 100, ml: 2 }}
        >
          <MenuItem value={10}>10件</MenuItem>
          <MenuItem value={20}>20件</MenuItem>
          <MenuItem value={30}>30件</MenuItem>
          <MenuItem value={50}>50件</MenuItem>
        </Select>
      </Box>
    </>
  );
}

import React from "react";
import {
  Box,
  TextField,
  Slider,
  Typography,
  Button,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../contexts/Context.tsx";
import { MultiSelectBox } from "./MultiSelectBox.tsx";

export interface FilterState {
  rentRange: number[];
  setRentRange: (v: number[]) => void;
  layout: string[];
  setLayout: React.Dispatch<React.SetStateAction<string[]>>;
  areaRange: number[];
  setAreaRange: (v: number[]) => void;
  buildingType: string[];
  setBuildingType: React.Dispatch<React.SetStateAction<string[]>>;
  buildingAgeRange: number[];
  setBuildingAgeRange: (v: number[]) => void;
  address: string;
  setAddress: (v: string) => void;
  pageSize: number;
  setPageSize: (v: number) => void;
}

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

  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 1,
          width: "100%",
        }}
      >
        {/* キーワード検索 */}
        <Box sx={{ width: "100%", maxWidth: 480 }}>
          <Tooltip
            title={<div>検索対象：物件名／住所</div>}
            arrow
            placement="top"
            slotProps={{ tooltip: { sx: { p: 1, fontSize: 12 } } }}
          >
            <TextField
              label="キーワード検索"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              size="small"
              sx={{ width: "100%", maxWidth: 480 }}
            />
          </Tooltip>
        </Box>
        {/* スライダー群 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          {/* 家賃スライダー */}
          <Box>
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
          {/* 面積スライダー */}
          <Box>
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
          {/* 築年数スライダー */}
          <Box>
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
        </Box>
        {/* プルダウン2つを横並びで（MultiSelectBoxに置換） */}
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <MultiSelectBox
            label="間取り"
            options={["1R", "1K", "1DK", "1LDK", "2DK", "2LDK", "3DK", "3LDK"]}
            value={layout}
            onChange={setLayout}
            minWidth={180}
            maxWidth={600}
          />
          <MultiSelectBox
            label="建物種別"
            options={["マンション", "アパート"]}
            value={buildingType}
            onChange={setBuildingType}
            minWidth={180}
            maxWidth={440}
          />
        </Box>
      </Box>
      {/* 検索・リセット・ページング件数セレクトを下部に復元 */}
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

import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Slider,
  Typography,
  Tooltip,
  OutlinedInput,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../contexts/Context.tsx";
// MUIアイコンの例: import SearchIcon from '@mui/icons-material/Search';

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

const layouts = ["", "1R", "1K", "1DK", "1LDK", "2DK", "2LDK", "3DK", "3LDK"];
const buildingTypes = ["", "マンション", "アパート"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, selected: readonly string[], theme: any) {
  return {
    fontWeight: selected.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
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
        {/* キーワード検索（ツールチップ付き）を一番上に全幅で */}
        <Box sx={{ width: "100%" }}>
          <Tooltip
            title={<div>検索対象：物件名／住所</div>}
            arrow
            placement="top"
          >
            <TextField
              label="キーワード検索"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              size="small"
              sx={{ width: "100%" }}
            />
          </Tooltip>
        </Box>
        {/* スライダー群を縦並びで */}
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
        {/* プルダウン2つを横並びで */}
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <FormControl
            sx={{ flexGrow: 1, minWidth: 120, maxWidth: 180 }}
            size="small"
          >
            <InputLabel id="layout-multi-chip-label">間取り</InputLabel>
            <Select
              labelId="layout-multi-chip-label"
              id="layout-multi-chip"
              multiple
              value={layout}
              onChange={(e) =>
                setLayout(
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value
                )
              }
              input={
                <OutlinedInput id="select-multiple-layout" label="間取り" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {layouts
                .filter((l) => l)
                .map((l) => (
                  <MenuItem
                    key={l}
                    value={l}
                    style={getStyles(l, layout, theme)}
                  >
                    {l}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{ flexGrow: 1, minWidth: 120, maxWidth: 180 }}
            size="small"
          >
            <InputLabel id="buildingtype-multi-chip-label">建物種別</InputLabel>
            <Select
              labelId="buildingtype-multi-chip-label"
              id="buildingtype-multi-chip"
              multiple
              value={buildingType}
              onChange={(e) =>
                setBuildingType(
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value
                )
              }
              input={
                <OutlinedInput
                  id="select-multiple-buildingtype"
                  label="建物種別"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {buildingTypes
                .filter((t) => t)
                .map((t) => (
                  <MenuItem
                    key={t}
                    value={t}
                    style={getStyles(t, buildingType, theme)}
                  >
                    {t}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
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

import React from "react";
import { Box, TextField, Select, MenuItem, Button } from '@mui/material';
// MUIアイコンの例: import SearchIcon from '@mui/icons-material/Search';

// 間取り・建物種別の選択肢
const layouts = ["", "1R", "1K", "1DK", "1LDK", "2DK", "2LDK", "3DK", "3LDK"];
const buildingTypes = ["", "マンション", "アパート"];

export default function FilterBar({ filterState, onFilter }) {
    // filterStateから各値とsetterを分割代入
    const {
        rentFrom, setRentFrom,
        rentTo, setRentTo,
        layout, setLayout,
        areaFrom, setAreaFrom,
        areaTo, setAreaTo,
        buildingType, setBuildingType,
        buildingAgeFrom, setBuildingAgeFrom,
        buildingAgeTo, setBuildingAgeTo,
        address, setAddress
    } = filterState;

    return (
        // Apple風の余白・角丸・配色でフォームを構成
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            {/* 家賃(下限) */}
            <TextField label="家賃(下限)" type="number" value={rentFrom} onChange={e => setRentFrom(e.target.value)} size="small" sx={{ minWidth: 110 }} />
            {/* 家賃(上限) */}
            <TextField label="家賃(上限)" type="number" value={rentTo} onChange={e => setRentTo(e.target.value)} size="small" sx={{ minWidth: 110 }} />
            {/* 間取りセレクト */}
            <Select value={layout} onChange={e => setLayout(e.target.value)} displayEmpty size="small" sx={{ minWidth: 110, bgcolor: '#fff', borderRadius: 1 }}>
                <MenuItem value="">間取り</MenuItem>
                {layouts.filter(l => l).map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </Select>
            {/* 面積(下限) */}
            <TextField label="面積(下限)" type="number" value={areaFrom} onChange={e => setAreaFrom(e.target.value)} size="small" sx={{ minWidth: 110 }} />
            {/* 面積(上限) */}
            <TextField label="面積(上限)" type="number" value={areaTo} onChange={e => setAreaTo(e.target.value)} size="small" sx={{ minWidth: 110 }} />
            {/* 建物種別セレクト */}
            <Select value={buildingType} onChange={e => setBuildingType(e.target.value)} displayEmpty size="small" sx={{ minWidth: 110, bgcolor: '#fff', borderRadius: 1 }}>
                <MenuItem value="">建物種別</MenuItem>
                {buildingTypes.filter(t => t).map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
            {/* 築年数(下限) */}
            <TextField label="築年数(下限)" type="number" value={buildingAgeFrom} onChange={e => setBuildingAgeFrom(e.target.value)} size="small" sx={{ minWidth: 110 }} />
            {/* 築年数(上限) */}
            <TextField label="築年数(上限)" type="number" value={buildingAgeTo} onChange={e => setBuildingAgeTo(e.target.value)} size="small" sx={{ minWidth: 110 }} />
            {/* 住所・物件名キーワード */}
            <TextField label="住所/物件名キーワード" value={address} onChange={e => setAddress(e.target.value)} size="small" sx={{ minWidth: 140 }} />
            {/* 検索ボタン（MUIアイコンを使う場合: startIcon={<SearchIcon />}） */}
            <Button variant="contained" color="primary" onClick={onFilter} sx={{ minWidth: 100, borderRadius: 2 }}>
                検索
            </Button>
        </Box>
    );
} 
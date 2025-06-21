import React from "react";
import { Grid, Card, CardContent, Typography, Link } from '@mui/material';
// MUIアイコンの例: import HomeIcon from '@mui/icons-material/Home';

export default function PropertyTable({ properties }) {
    return (
        // レスポンシブなグリッドでカード型物件リストを表示
        <Grid container spacing={3}>
            {properties.map((p) => (
                <Grid item xs={12} sm={6} md={4} key={p.id}>
                    {/* Apple風の角丸・影・余白を持つカード */}
                    <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                        <CardContent>
                            {/* 物件名 */}
                            <Typography variant="h6" sx={{ mb: 1 }}>{p.name}</Typography>
                            {/* 住所 */}
                            <Typography color="text.secondary" sx={{ mb: 1 }}>{p.address}</Typography>
                            {/* 家賃 */}
                            <Typography>家賃: {p.rent_min.toLocaleString()}〜{p.rent_max.toLocaleString()}円</Typography>
                            {/* 間取り・面積 */}
                            <Typography>間取り: {p.layout} / 面積: {p.area_min}〜{p.area_max}㎡</Typography>
                            {/* 建物種別・築年数・階数 */}
                            <Typography>建物: {p.building_type} / 築年数: {p.building_age} / 階数: {p.floor}</Typography>
                            {/* 管理費・敷金・礼金 */}
                            <Typography>管理費: {p.admin_fee_min ? p.admin_fee_min.toLocaleString() : 0}円 / 敷金: {p.deposit ? p.deposit.toLocaleString() : 0}円 / 礼金: {p.key_money ? p.key_money.toLocaleString() : 0}円</Typography>
                            {/* SUUMOリンク（MUIアイコンを使う場合: <HomeIcon sx={{ mr: 0.5 }} /> など） */}
                            <Link href={p.url} target="_blank" rel="noopener" color="primary" underline="hover" sx={{ mt: 1, display: 'block' }}>
                                SUUMOで詳細を見る
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
} 
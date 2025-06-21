import React from "react";
import { List, ListItem, ListItemText, Divider, Link } from "@mui/material";
import { usePropertyContext } from "../contexts/PropertyContext.tsx";
// MUIアイコンの例: import HomeIcon from '@mui/icons-material/Home';

export interface Property {
  id: number;
  name: string;
  address: string;
  rent_min: number;
  rent_max: number;
  layout: string;
  area_min: number;
  area_max: number;
  building_type: string;
  building_age: string;
  floor: string;
  admin_fee_min?: number;
  deposit?: number;
  key_money?: number;
  url: string;
}

export function PropertyTable() {
  const { filtered } = usePropertyContext();
  return (
    <List sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
      {filtered.map((p, idx) => (
        <React.Fragment key={p.id}>
          <ListItem
            alignItems="flex-start"
            sx={{ flexDirection: "column", alignItems: "stretch", py: 2 }}
          >
            <ListItemText
              primary={
                <span style={{ fontWeight: 600, fontSize: 18 }}>{p.name}</span>
              }
              secondary={
                <>
                  <span style={{ color: "#666" }}>{p.address}</span>
                  <br />
                  家賃: {p.rent_min.toLocaleString()}〜
                  {p.rent_max.toLocaleString()}円 ／ 間取り: {p.layout} ／ 面積:{" "}
                  {p.area_min}〜{p.area_max}㎡<br />
                  建物: {p.building_type} ／ 築年数: {p.building_age} ／ 階数:{" "}
                  {p.floor}
                  <br />
                  管理費:{" "}
                  {p.admin_fee_min ? p.admin_fee_min.toLocaleString() : 0}円 ／
                  敷金: {p.deposit ? p.deposit.toLocaleString() : 0}円 ／ 礼金:{" "}
                  {p.key_money ? p.key_money.toLocaleString() : 0}円<br />
                  <Link
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    color="primary"
                    underline="hover"
                    sx={{ mt: 1, display: "inline-block" }}
                  >
                    SUUMOで詳細を見る
                  </Link>
                </>
              }
            />
          </ListItem>
          {idx !== filtered.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}

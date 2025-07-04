// 金額フィールドを安全に数値化して表示するユーティリティ
export function parsePrice(val: any): string {
  if (typeof val === "number") return val.toLocaleString();
  if (typeof val === "string") {
    if (val === "-" || val === "" || val == null) return "-";
    // 「万円」表記
    if (val.includes("万円")) {
      const num = parseFloat(val.replace("万円", ""));
      if (!isNaN(num)) return (num * 10000).toLocaleString();
      return val;
    }
    // 「円」表記
    if (val.includes("円")) {
      const num = parseInt(val.replace(/円|,/g, ""), 10);
      if (!isNaN(num)) return num.toLocaleString();
      return val;
    }
    // 純粋な数値文字列
    const num = Number(val);
    if (!isNaN(num)) return num.toLocaleString();
    return val;
  }
  return "-";
}

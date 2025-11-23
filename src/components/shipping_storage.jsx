import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import provincesJSON from "../province.json";
import wardsJSON from "../ward.json";
import useOrders from "../utils/shipping_data_storage";

export default function ShippingStorage() {
  const { getOrders, deleteOrder } = useOrders();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, [getOrders]);

  const provinces = useMemo(
    () =>
      Array.isArray(provincesJSON)
        ? provincesJSON
        : Object.entries(provincesJSON).map(([k, v]) => ({ code: k, ...v })),
    []
  );
  const wards = useMemo(
    () =>
      Array.isArray(wardsJSON)
        ? wardsJSON
        : Object.entries(wardsJSON).map(([k, v]) => ({ code: k, ...v })),
    []
  );

  function handleDelete(id) {
    if (!confirm("Bạn có chắc muốn xóa đơn này?")) return;
    const ok = deleteOrder(id);
    if (ok) setOrders(getOrders());
    else alert("Xóa thất bại");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7fafc",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            padding: 32,
            borderRadius: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: "#2d3748",
              }}
            >
              Quản lý đơn hàng
            </h2>
            <div style={{ display: "flex", gap: 12 }}>
              <Link
                to="/"
                style={{
                  padding: "10px 20px",
                  background: "#e2e8f0",
                  color: "#2d3748",
                  textDecoration: "none",
                  borderRadius: 8,
                  fontWeight: 500,
                }}
              >
                Trang chủ
              </Link>
              <Link
                to="/create"
                style={{
                  padding: "10px 20px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: 8,
                  fontWeight: 500,
                }}
              >
                Tạo đơn
              </Link>
              <button
                onClick={() => setOrders(getOrders())}
                style={{
                  padding: "10px 20px",
                  background: "#48bb78",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Làm mới
              </button>
            </div>
          </div>
        </div>

        {orders.length === 0 && (
          <div
            style={{
              background: "#fff",
              padding: 60,
              borderRadius: 16,
              textAlign: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ fontSize: 20, color: "#718096", fontWeight: 500 }}>
              Chưa có đơn hàng nào
            </h3>
            <Link
              to="/create"
              style={{
                display: "inline-block",
                marginTop: 20,
                padding: "12px 24px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                textDecoration: "none",
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              Tạo đơn đầu tiên
            </Link>
          </div>
        )}

        <div style={{ display: "grid", gap: 16 }}>
          {orders.map((o) => {
            const ward = wards.find(
              (w) => String(w.code) === String(o.ward_code)
            );
            const province = provinces.find(
              (p) => String(p.code) === String(o.province_code)
            );
            return (
              <div
                key={o.id}
                style={{
                  background: "#fff",
                  padding: 24,
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.12)";
                  e.currentTarget.style.borderColor = "#667eea";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.06)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#2d3748",
                        marginBottom: 8,
                      }}
                    >
                      {o.username}
                    </div>
                    <div style={{ color: "#718096", marginBottom: 4 }}>
                      {"Số điện thoại : " + o.phone}
                    </div>
                    <div style={{ color: "#718096", marginBottom: 8 }}>
                      {"Địa chỉ : " + (o.home ? `${o.home}, ` : "")}
                      {ward ? ward.name_with_type : o.ward}
                      {province ? `, ${province.name_with_type}` : o.province}
                    </div>
                    <div style={{ fontSize: 12, color: "#a0aec0" }}>
                      {" "}
                      {"Ngày tạo : " +
                        (o.createdAt
                          ? new Date(o.createdAt).toLocaleString("vi-VN")
                          : "?")}{" "}
                      • ID: {o.id}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(o.id)}
                    style={{
                      padding: "10px 20px",
                      background: "#f56565",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#e53e3e")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "#f56565")
                    }
                  >
                    Xóa
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

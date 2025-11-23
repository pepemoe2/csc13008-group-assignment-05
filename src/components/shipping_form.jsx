import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import provincesJSON from "../province.json";
import wardsJSON from "../ward.json";
import useOrders from "../utils/shipping_data_storage";

export default function ShippingForm() {
  const navigate = useNavigate();
  const { addOrder } = useOrders();

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

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [home, setHome] = useState("");
  const [province, setProvince] = useState("");
  const [ward, setWard] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const filteredWards = useMemo(() => {
    if (!province) return [];
    return wards.filter((w) => String(w.parent_code) === String(province));
  }, [wards, province]);

  function validate() {
    if (!username.trim()) return "Vui lòng nhập tên";
    if (!/^\d{9,11}$/.test(phone.trim()))
      return "Số điện thoại không hợp lệ (9-11 chữ số)";
    if (!province) return "Chọn tỉnh/thành";
    if (!ward) return "Chọn phường/xã";
    if (!home.trim()) return "Nhập địa chỉ (số nhà / đường)";
    if (!agree) return "Bạn phải đồng ý cam kết";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    const provinceObj = provinces.find(
      (p) => String(p.code) === String(province)
    );
    const wardObj = wards.find((w) => String(w.code) === String(ward));
    const order = {
      username: username.trim(),
      phone: phone.trim(),
      home: home.trim(),
      province_code: province,
      ward_code: ward,
      province: provinceObj
        ? provinceObj.name_with_type || provinceObj.name
        : province,
      ward: wardObj ? wardObj.name_with_type || wardObj.name : ward,
      agree: !!agree,
    };
    const saved = addOrder(order);
    if (saved) {
      navigate("/orders");
    } else {
      setError("Lưu thất bại, thử lại");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#fff",
          padding: 32,
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
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
            Tạo đơn hàng
          </h2>
          <div style={{ display: "flex", gap: 12 }}>
            <Link
              to="/"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Trang chủ
            </Link>
            <Link
              to="/orders"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Quản lý đơn
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Họ và tên",
              value: username,
              set: setUsername,
              placeholder: "Nguyễn Văn A",
            },
            {
              label: "Số điện thoại",
              value: phone,
              set: setPhone,
              placeholder: "0912345678",
            },
            {
              label: "Số nhà / Đường",
              value: home,
              set: setHome,
              placeholder: "123 Nguyễn Huệ",
            },
          ].map((field, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <label
                style={{
                  fontWeight: 600,
                  color: "#2d3748",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {field.label}
              </label>
              <input
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                placeholder={field.placeholder}
                style={{
                  width: "100%",
                  padding: 12,
                  border: "2px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 14,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          ))}

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                fontWeight: 600,
                color: "#2d3748",
                display: "block",
                marginBottom: 6,
              }}
            >
              Tỉnh / Thành
            </label>
            <select
              value={province}
              onChange={(e) => {
                setProvince(e.target.value);
                setWard("");
              }}
              style={{
                width: "100%",
                padding: 12,
                border: "2px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 14,
              }}
            >
              <option value="">-- Chọn tỉnh/thành --</option>
              {provinces.map((p) => (
                <option key={String(p.code)} value={p.code}>
                  {p.name_with_type || p.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                fontWeight: 600,
                color: "#2d3748",
                display: "block",
                marginBottom: 6,
              }}
            >
              Phường / Xã
            </label>
            <select
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              disabled={!province}
              style={{
                width: "100%",
                padding: 12,
                border: "2px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 14,
              }}
            >
              <option value="">
                {province ? "-- Chọn phường/xã --" : "Chọn tỉnh trước"}
              </option>
              {filteredWards.map((w) => (
                <option key={String(w.code)} value={w.code}>
                  {w.name_with_type || w.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                style={{ marginRight: 8 }}
              />
              <span style={{ fontSize: 14, color: "#4a5568" }}>
                Tôi cam kết những thông tin là chính xác
              </span>
            </label>
          </div>

          {error && (
            <div
              style={{
                color: "#e53e3e",
                marginBottom: 16,
                padding: 12,
                background: "#fff5f5",
                borderRadius: 8,
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              padding: 14,
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Tạo đơn hàng
          </button>
        </form>
      </div>
    </div>
  );
}

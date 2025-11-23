import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const members = [
    { name: "Nguyễn Đăng Khoa", mssv: "23127393" },
    { name: "Đặng Nguyễn Thành Hiếu", mssv: "23127364" },
  ];

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header / Navigation */}
      <header
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          padding: "16px 32px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
            HK Express
          </h1>
          <nav style={{ display: "flex", gap: 20 }}>
            <Link
              to="/"
              style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}
            >
              Trang chủ
            </Link>
            <Link
              to="/create"
              style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}
            >
              Tạo đơn
            </Link>
            <Link
              to="/orders"
              style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}
            >
              Quản lý đơn
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 800,
              margin: 0,
              marginBottom: 16,
              textShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            Quản lý đơn hàng dễ dàng
          </h2>
          <p
            style={{
              fontSize: 20,
              opacity: 0.95,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Hệ thống quản lý thông tin giao hàng hiện đại, nhanh chóng và tiện
            lợi. Tạo đơn hàng, theo dõi và quản lý.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/create"
              style={{
                background: "#fff",
                color: "#667eea",
                padding: "14px 32px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
            >
              Tạo đơn ngay
            </Link>
            <Link
              to="/orders"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 16,
                border: "2px solid #fff",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#fff";
                e.target.style.color = "#667eea";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)";
                e.target.style.color = "#fff";
              }}
            >
              Xem danh sách đơn
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content - Team Members */}
      <main style={{ flex: 1, padding: "60px 32px", background: "#f7fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Features Section */}
          <section style={{ marginBottom: 60 }}>
            <h3
              style={{
                fontSize: 32,
                fontWeight: 700,
                textAlign: "center",
                marginBottom: 40,
                color: "#2d3748",
              }}
            >
              Tính năng
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {[
                {
                  title: "Tạo đơn nhanh",
                  desc: "Điền form đơn giản",
                },
                {
                  title: "Quản lý dễ dàng",
                  desc: "Xem danh sách, xoá đơn hàng",
                },
                {
                  title: "Dữ liệu local",
                  desc: "Lưu tự động vào Local Storage",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    padding: 32,
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    textAlign: "center",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>{f.icon}</div>
                  <h4
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "#2d3748",
                    }}
                  >
                    {f.title}
                  </h4>
                  <p style={{ color: "#718096", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Members Section */}
          <section>
            <h3
              style={{
                fontSize: 32,
                fontWeight: 700,
                textAlign: "center",
                marginBottom: 40,
                color: "#2d3748",
              }}
            >
              Thành viên nhóm
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 24,
              }}
            >
              {members.map((member, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#fff",
                    padding: 28,
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    textAlign: "center",
                    border: "2px solid transparent",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#667eea";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      margin: "0 auto 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                      color: "#fff",
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                    }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <h4
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "#2d3748",
                    }}
                  >
                    {member.name}
                  </h4>
                  <p
                    style={{
                      color: "#718096",
                      fontSize: 14,
                      fontFamily: "monospace",
                    }}
                  >
                    MSSV: {member.mssv}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#2d3748",
          color: "#fff",
          padding: "32px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
              HK Express
            </h4>
            <p style={{ opacity: 0.8, fontSize: 14, lineHeight: 1.6 }}>
              Hệ thống quản lý đơn hàng đơn giản, hiện đại và hiệu quả
            </p>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.2)",
              paddingTop: 20,
              opacity: 0.7,
              fontSize: 14,
            }}
          >
            © {new Date().getFullYear()} Enhanced Shipping Form - GA05. Made
            with by Team Members
          </div>
        </div>
      </footer>
    </div>
  );
}

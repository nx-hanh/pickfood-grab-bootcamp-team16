import {
  User,
  ShieldCheck,
  Bell,
  Lock,
  CalendarCheck,
  BadgeHelp,
  Boxes,
} from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="p-3 max-w-screen-md">
      <div className="text-center text-2xl font-medium">Cài đặt</div>
      <section className="settings-section">
        <h2 className="text-xl font-semibold mb-2">Tài khoản</h2>
        <ul>
          <li className="text-lg">
            <User className="mr-10" /> Chỉnh sửa thông tin
          </li>
          <li className="text-lg">
            <ShieldCheck className="mr-10" /> Bảo mật
          </li>
          <li className="text-lg">
            <Bell className="mr-10" /> Thông báo
          </li>
          <li className="text-lg">
            <Lock className="mr-10" /> Quyền riêng tư
          </li>
        </ul>
      </section>

      <section className="settings-section">
        <h2 className="text-xl font-semibold mb-2">Hỗ trợ</h2>
        <ul>
          <li className="text-lg">
            <CalendarCheck className="mr-10" /> Đăng kí
          </li>
          <li className="text-lg">
            <BadgeHelp className="mr-10" /> Trợ giúp
          </li>
          <li className="text-lg">
            <Boxes className="mr-10" /> Điều khoản
          </li>
        </ul>
      </section>
    </div>
  );
};

export default SettingsPage;

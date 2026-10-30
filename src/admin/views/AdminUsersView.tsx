import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Shield, KeyRound, UserCheck, Lock, Check } from 'lucide-react';

export const AdminUsersView: React.FC = () => {
  const { adminUsers, currentUser, updatePassword, addToast } = useCms();

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) {
      addToast('Password must be at least 6 characters', 'error');
      return;
    }
    if (newPass !== confirmPass) {
      addToast('New passwords do not match', 'error');
      return;
    }

    if (currentUser) {
      updatePassword(currentUser.id, newPass);
      setPassSuccess(true);
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => setPassSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block">
            Access Control & Governance
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#133826]">
            Admin Users & Permissions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage administrator accounts, role-based permissions, and security passwords.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Admin Accounts Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs space-y-5">
          <h3 className="font-serif font-bold text-lg text-[#133826] border-b pb-3">
            Active Administrative Accounts
          </h3>

          <div className="space-y-3">
            {adminUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#133826] text-[#D4A373] flex items-center justify-center font-bold text-xs">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{user.name}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        {user.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{user.email}</div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400">
                  Last login: {user.lastLogin}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#F2EDE5] rounded-xl text-xs text-slate-600 border border-[#E0D7CB]">
            <strong>Role Permissions:</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
              <li><strong>Super Admin:</strong> Full CMS CRUD, system backups, and credential resets.</li>
              <li><strong>Content Editor:</strong> Destinations, gallery, hero, and packages.</li>
              <li><strong>Booking Manager:</strong> Guest inquiries, status processing, and customer notes.</li>
            </ul>
          </div>
        </div>

        {/* Change Password Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#EBE4DC] shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#133826] border-b pb-3">
            Change Master Security Key
          </h3>

          {passSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Password successfully updated</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 text-xs bg-white border border-[#D5CEC5] rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                New Security Password
              </label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full px-3 py-2 text-xs bg-white border border-[#D5CEC5] rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3 py-2 text-xs bg-white border border-[#D5CEC5] rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] transition-colors"
            >
              Update Security Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Users,
  Edit2,
  Trash2,
  Plus,
  X,
  Phone,
  User,
  Link2,
  Info,
} from "lucide-react";

export default function ParentsManagement({
  parents,
  onAdd,
  onUpdate,
  onDelete,
  openAddModal,
  setOpenAddModal,
}) {
  const { t } = useTranslation();

  // Modal Edit states
  const [editingParent, setEditingParent] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    telegramChatId: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.relationship ||
      !formData.phone ||
      !formData.telegramChatId
    ) {
      alert("All fields are required");
      return;
    }
    onAdd(formData);
    setFormData({ name: "", relationship: "", phone: "", telegramChatId: "" });
    setOpenAddModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (
      !editingParent.name ||
      !editingParent.relationship ||
      !editingParent.phone ||
      !editingParent.telegramChatId
    ) {
      alert("All fields are required");
      return;
    }
    onUpdate(editingParent._id, editingParent);
    setEditingParent(null);
  };

  const startEdit = (parent) => {
    setEditingParent({ ...parent });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header and Add Trigger */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {t("dashboard.parents")}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure daily check-in links and alert recipients
          </p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl text-xs shadow-md flex items-center space-x-1"
        >
          <Plus className="h-4 w-4" />
          <span>{t("dashboard.addParent")}</span>
        </button>
      </div>

      {/* Parents List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-purple-100 dark:border-purple-950 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <th className="py-4 px-4">{t("dashboard.name")}</th>
                <th className="py-4 px-4">{t("dashboard.relationship")}</th>
                <th className="py-4 px-4">{t("dashboard.phone")}</th>
                <th className="py-4 px-4">{t("dashboard.telegramChatId")}</th>
                <th className="py-4 px-4">{t("dashboard.status")}</th>
                <th className="py-4 px-4 text-right">
                  {t("dashboard.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
              {parents.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-12 text-slate-400 dark:text-slate-500"
                  >
                    No parents registered yet. Register a parent to configure
                    daily check-ins.
                  </td>
                </tr>
              ) : (
                parents.map((parent) => (
                  <tr
                    key={parent._id}
                    className="hover:bg-purple-50/10 dark:hover:bg-slate-800/10"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center font-bold text-purple-700 dark:text-purple-300 text-xs">
                        {parent.name.charAt(0)}
                      </div>
                      <span>{parent.name}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {parent.relationship}
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {parent.phone}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-slate-500">
                      {parent.telegramChatId}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          parent.checkinStatus === "Safe"
                            ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                            : parent.checkinStatus === "Escalated"
                              ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                              : "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
                        }`}
                      >
                        {parent.checkinStatus === "Safe"
                          ? t("dashboard.safe")
                          : parent.checkinStatus === "Escalated"
                            ? t("dashboard.escalated")
                            : t("dashboard.pending")}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => startEdit(parent)}
                        className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 p-2 rounded-lg inline-block"
                        title="Edit parent"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this parent?",
                            )
                          )
                            onDelete(parent._id);
                        }}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-lg inline-block"
                        title="Delete parent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Notice about Telegram */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl flex items-start space-x-3 text-xs text-slate-800 dark:text-slate-400">
        <Info className="h-5 w-5 text-blue-600 dark:text-purple-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Telegram Integration Tip:</span>
          <p className="mt-1 leading-relaxed">
            For parents to receive automated check-in links, they must search
            for your Telegram Bot, click <strong>Start</strong> to retrieve
            their <strong>Chat ID</strong>, and you must register that Chat ID
            in their profile above.
          </p>
        </div>
      </div>

      {/* Add Parent Modal */}
      {openAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-6 relative border border-purple-50 dark:border-purple-950">
            <button
              onClick={() => setOpenAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>{t("dashboard.addParent")}</span>
            </h2>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Amma"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.relationship")}
                </label>
                <input
                  type="text"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  placeholder="e.g., Mother / Father"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g., 0775366327"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.telegramChatId")}
                </label>
                <input
                  type="text"
                  name="telegramChatId"
                  value={formData.telegramChatId}
                  onChange={handleInputChange}
                  placeholder="e.g., 102938475"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenAddModal(false)}
                  className="flex-1 py-3 border border-purple-200 dark:border-purple-800 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs"
                >
                  {t("dashboard.cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-md shadow-purple-600/10"
                >
                  {t("dashboard.save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Parent Modal */}
      {editingParent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-6 relative border border-purple-50 dark:border-purple-950">
            <button
              onClick={() => setEditingParent(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>Edit Parent Profile</span>
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.name")}
                </label>
                <input
                  type="text"
                  value={editingParent.name}
                  onChange={(e) =>
                    setEditingParent({ ...editingParent, name: e.target.value })
                  }
                  placeholder="e.g., Amma"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.relationship")}
                </label>
                <input
                  type="text"
                  value={editingParent.relationship}
                  onChange={(e) =>
                    setEditingParent({
                      ...editingParent,
                      relationship: e.target.value,
                    })
                  }
                  placeholder="e.g., Mother / Father"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.phone")}
                </label>
                <input
                  type="tel"
                  value={editingParent.phone}
                  onChange={(e) =>
                    setEditingParent({
                      ...editingParent,
                      phone: e.target.value,
                    })
                  }
                  placeholder="e.g., 0775366327"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.telegramChatId")}
                </label>
                <input
                  type="text"
                  value={editingParent.telegramChatId}
                  onChange={(e) =>
                    setEditingParent({
                      ...editingParent,
                      telegramChatId: e.target.value,
                    })
                  }
                  placeholder="e.g., 102938475"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.status")}
                </label>
                <select
                  value={editingParent.checkinStatus}
                  onChange={(e) =>
                    setEditingParent({
                      ...editingParent,
                      checkinStatus: e.target.value,
                    })
                  }
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Safe">Safe</option>
                  <option value="Escalated">Escalated</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingParent(null)}
                  className="flex-1 py-3 border border-purple-200 dark:border-purple-800 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs"
                >
                  {t("dashboard.cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-md shadow-purple-600/10"
                >
                  {t("dashboard.save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

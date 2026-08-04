import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  UserCheck,
  Edit2,
  Trash2,
  Plus,
  X,
  Phone,
  UserPlus,
  Info,
} from "lucide-react";

export default function NeighborsManagement({
  neighbors,
  onAdd,
  onUpdate,
  onDelete,
  openAddModal,
  setOpenAddModal,
}) {
  const { t } = useTranslation();

  // Modal Edit states
  const [editingNeighbor, setEditingNeighbor] = useState(null);

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
    if (!formData.name || !formData.phone || !formData.telegramChatId) {
      alert("Name, phone, and Telegram Chat ID are required");
      return;
    }
    onAdd(formData);
    setFormData({ name: "", relationship: "", phone: "", telegramChatId: "" });
    setOpenAddModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (
      !editingNeighbor.name ||
      !editingNeighbor.phone ||
      !editingNeighbor.telegramChatId
    ) {
      alert("Name, phone, and Telegram Chat ID are required");
      return;
    }
    onUpdate(editingNeighbor._id, editingNeighbor);
    setEditingNeighbor(null);
  };

  const startEdit = (neighbor) => {
    setEditingNeighbor({ ...neighbor });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header and Add Trigger */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {t("dashboard.neighbors")}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage neighborhood emergency responders
          </p>
        </div>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl text-xs shadow-md flex items-center space-x-1"
        >
          <Plus className="h-4 w-4" />
          <span>{t("dashboard.addNeighbor")}</span>
        </button>
      </div>

      {/* Neighbors List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-purple-100 dark:border-purple-950 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <th className="py-4 px-4">{t("dashboard.name")}</th>
                <th className="py-4 px-4">{t("dashboard.relationship")}</th>
                <th className="py-4 px-4">{t("dashboard.phone")}</th>
                <th className="py-4 px-4">{t("dashboard.telegramChatId")}</th>
                <th className="py-4 px-4 text-right">
                  {t("dashboard.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
              {neighbors.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-12 text-slate-400 dark:text-slate-500"
                  >
                    No neighbors registered yet. Register contacts living nearby
                    for emergency alerts.
                  </td>
                </tr>
              ) : (
                neighbors.map((neighbor) => (
                  <tr
                    key={neighbor._id}
                    className="hover:bg-purple-50/10 dark:hover:bg-slate-800/10"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center font-bold text-purple-700 dark:text-purple-300 text-xs">
                        {neighbor.name.charAt(0)}
                      </div>
                      <span>{neighbor.name}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {neighbor.relationship || "Neighbor"}
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {neighbor.phone}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-slate-500">
                      {neighbor.telegramChatId}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => startEdit(neighbor)}
                        className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 p-2 rounded-lg inline-block"
                        title="Edit neighbor"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this neighbor?",
                            )
                          )
                            onDelete(neighbor._id);
                        }}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-lg inline-block"
                        title="Delete neighbor"
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

      {/* Info Notice about Neighbors */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl flex items-start space-x-3 text-xs text-slate-800 dark:text-slate-400">
        <Info className="h-5 w-5 text-blue-600 dark:text-purple-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Neighbor Alert Logic:</span>
          <p className="mt-1 leading-relaxed">
            Registered neighbors will receive automated emergency notifications
            via Telegram if a parent remains unresponsive after the 10:00 AM
            check-in deadline. Ensure their Telegram Chat ID is entered
            correctly.
          </p>
        </div>
      </div>

      {/* Add Neighbor Modal */}
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
              <UserPlus className="h-5 w-5 text-purple-600" />
              <span>{t("dashboard.addNeighbor")}</span>
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
                  placeholder="e.g., Ravi Kumara"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  Relationship / Details
                </label>
                <input
                  type="text"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  placeholder="e.g., Next Door / Neighbor downstairs"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
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
                  placeholder="e.g., 0712345678"
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
                  placeholder="e.g., 987654321"
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

      {/* Edit Neighbor Modal */}
      {editingNeighbor && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-6 relative border border-purple-50 dark:border-purple-950">
            <button
              onClick={() => setEditingNeighbor(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center space-x-2">
              <UserPlus className="h-5 w-5 text-purple-600" />
              <span>Edit Neighbor Contact</span>
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.name")}
                </label>
                <input
                  type="text"
                  value={editingNeighbor.name}
                  onChange={(e) =>
                    setEditingNeighbor({
                      ...editingNeighbor,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g., Ravi Kumara"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  Relationship / Details
                </label>
                <input
                  type="text"
                  value={editingNeighbor.relationship}
                  onChange={(e) =>
                    setEditingNeighbor({
                      ...editingNeighbor,
                      relationship: e.target.value,
                    })
                  }
                  placeholder="e.g., Next Door"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  {t("dashboard.phone")}
                </label>
                <input
                  type="tel"
                  value={editingNeighbor.phone}
                  onChange={(e) =>
                    setEditingNeighbor({
                      ...editingNeighbor,
                      phone: e.target.value,
                    })
                  }
                  placeholder="e.g., 0712345678"
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
                  value={editingNeighbor.telegramChatId}
                  onChange={(e) =>
                    setEditingNeighbor({
                      ...editingNeighbor,
                      telegramChatId: e.target.value,
                    })
                  }
                  placeholder="e.g., 987654321"
                  className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingNeighbor(null)}
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

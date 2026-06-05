import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  Loader2,
  Check,
  X
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Terrains = () => {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTerrains();
  }, []);

  const fetchTerrains = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/terrains`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTerrains(response.data.data || []);
    } catch (err) {
      console.error('Error fetching terrains', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce terrain ?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/admin/terrains/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTerrains(terrains.filter(t => t.id !== id));
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  const filteredTerrains = terrains.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Terrains</h1>
          <p className="text-text-secondary">Gérez vos lots et promotions immobilières.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} />
          Ajouter un terrain
        </button>
      </div>

      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un terrain..." 
              className="w-full pl-10 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="btn-outline flex-1 md:flex-none">
              <Filter size={18} />
              Filtrer
            </button>
          </div>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Terrain</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Localisation</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Prix</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Statut</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin text-primary mx-auto" size={32} />
                  </td>
                </tr>
              ) : filteredTerrains.length > 0 ? (
                filteredTerrains.map((terrain) => (
                  <tr key={terrain.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={terrain.image_url} 
                          alt={terrain.title} 
                          className="w-12 h-12 rounded-lg object-cover border border-border"
                        />
                        <div>
                          <p className="font-bold text-sm">{terrain.title}</p>
                          <p className="text-xs text-text-secondary">{terrain.area}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{terrain.location}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold">{terrain.price}</div>
                      {terrain.is_promotion && (
                        <div className="text-[10px] text-accent font-bold">PROMO: {terrain.promo_price}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-bold">
                        {terrain.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-white rounded-lg text-text-secondary transition-colors border border-transparent hover:border-border">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(terrain.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors border border-transparent hover:border-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-text-secondary">
                    Aucun terrain trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Terrains;

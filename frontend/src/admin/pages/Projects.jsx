import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Loader2,
  Calendar,
  MapPin
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(response.data.data || []);
    } catch (err) {
      console.error('Error fetching projects', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/admin/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert('Erreur');
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Projets</h1>
          <p className="text-text-secondary">Gérez vos réalisations et chantiers en cours.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} />
          Nouveau projet
        </button>
      </div>

      <div className="card mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un projet..." 
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card p-0 overflow-hidden group">
              <div className="relative h-48">
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-colors shadow-sm">
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-text-secondary font-bold">
                    <Calendar size={12} />
                    {project.year}
                  </span>
                </div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2 mb-4">{project.description}</p>
                <div className="flex items-center gap-1 text-[10px] text-text-secondary font-bold">
                  <MapPin size={12} />
                  {project.location}
                </div>
              </div>
            </div>
          ))}
          <button className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-text-secondary hover:border-primary hover:text-primary transition-all group">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Plus size={24} />
            </div>
            <span className="font-bold">Ajouter un projet</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;

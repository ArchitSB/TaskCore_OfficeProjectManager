import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { ProfileModal } from '../components/auth/ProfileModal';
import { getProjectsRequest } from '../api/projects.api';
import { getApiErrorMessage } from '../utils/error';
import { useAuth } from '../context/AuthContext';

function Team() {
  const { user } = useAuth();
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getProjectsRequest();
        const projects = response.data || [];
        
        const userMap = new Map();
        
        if (user && user._id) {
          userMap.set(user._id, {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: 'Active',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=0f172a&color=f59e0b`
          });
        }
        
        projects.forEach(project => {
          if (Array.isArray(project.members)) {
            project.members.forEach(member => {
              if (member && member._id && !userMap.has(member._id)) {
                userMap.set(member._id, {
                  _id: member._id,
                  name: member.name,
                  email: member.email,
                  role: member.role || 'member',
                  status: 'Active',
                  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'User')}&background=0f172a&color=f59e0b`
                });
              }
            });
          }
          if (project.createdBy && project.createdBy._id && !userMap.has(project.createdBy._id)) {
            userMap.set(project.createdBy._id, {
              _id: project.createdBy._id,
              name: project.createdBy.name,
              email: project.createdBy.email,
              role: project.createdBy.role || 'admin',
              status: 'Active',
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(project.createdBy.name || 'User')}&background=0f172a&color=f59e0b`
            });
          }
        });
        
        setTeamMembers(Array.from(userMap.values()));
      } catch (err) {
        setError(getApiErrorMessage(err, 'Unable to load team members'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeam();
  }, [user]);

  return (
    <>
      <div className="flex flex-col gap-lg">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-h1 text-h1 text-on-surface">Team</h2>
            <p className="font-body-sm text-body-sm text-slate-400">Manage team members and roles</p>
          </div>
        </div>

        {error && (
          <div className="mb-md rounded border border-red-500/40 bg-red-900/20 text-red-300 text-sm px-md py-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-slate-400 text-sm">Loading team...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {teamMembers.map(member => (
              <Card 
                key={member._id} 
                className="flex flex-col p-md hover:border-amber-500/50 hover:bg-[#1B2430] transition-colors cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex items-center gap-md">
                  <div className="relative">
                    <Avatar src={member.avatar} alt={member.name} className="w-12 h-12" />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#161D27] rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-slate-500'}`}></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface text-lg flex items-center gap-2">
                      {member.name}
                      <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded ${member.role === 'admin' ? 'bg-amber-900/50 text-amber-500' : 'bg-slate-800 text-slate-400'}`}>
                        {member.role}
                      </span>
                    </span>
                    <span className="text-sm text-slate-400">{member.email}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ProfileModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        user={selectedMember}
      />
    </>
  );
}

export default Team;

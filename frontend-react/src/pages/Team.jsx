import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { ProfileModal } from '../components/auth/ProfileModal';

// Mock data for the team members
const TEAM_MEMBERS = [
  { id: 1, name: 'Alex Rivera', role: 'Engineering Lead', status: 'Active', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe8K8CSv13OmN-1_fxVqLAke7MHByVgpj3NgMaaIsAnPWYuNtPXTGPHwVGM8Z9Pb0DEyiB3Sd7I2feKcUjl47Ethl1Q307sHM0hKfmf_IAbk0jDfUOCr2Km_PBgON1qL4z-eqxbAK3a5j5IbT0BIuddBCdriKMqwP0ebAn2b81iPwEmExzkm9IUIooyh_z4DIl68bHS9REqJJDG2-ZXGbaCXVHhBzQG6wGr-IgTwMOcjBwLHKHXs7eFEENb6lf1W75FchmiFr5Yw' },
  { id: 2, name: 'Marcus J.', role: 'Senior Frontend Engineer', status: 'Active', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Y37k6VUE5jR2K76DrH1eXGGvqDm7B5Lc9s_eXqvbpp7TtffXeS6B_lLrnq-h99_nj255I7j3qZe7nrQTGU0eFNv8KsptBbI7TCDwLvyhMdTVxLqEt_wciC3XYkM9MPyltmdxwUMsjnzlXjzZVTmN9yMdG9PpRaWtHhX_wTHt27skXddzxIR9m4XHWmPsSj-0OluP7iuMWVi7T9zi5mN4iQL8kCRlpZiIjlj9V9D9HfGHHHBNCjCdfWOYUf5ZjO8eGZDYIFLgCw' },
  { id: 3, name: 'Sarah C.', role: 'Backend Engineer', status: 'Offline', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0zaukvnKbJvU7UMDagFmUc09SPAH_OKmnSTxvVctTxXjw9_4q5oK-TuQIfzwRx7v83FuJOgNiGqg6quQVFRA-Oxo5-qT5kKU7dOfjJh_J0wSVX80qrhJR1lEY3GyI1-CuYNs8nokJDfF3n6JajZQLXxxQuTxSbz-xSxDA9nHafAYJmOmf4CRIiBR6gM23Xq2Wj0rmjeyCnFtpdmIjSOTnBDAxLFiWtYZ8XkBU2xA--4S2l9Qk-gQPmbxCXRx_JkLWMHsHNraP2w' }
];

function Team() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      <div className="flex flex-col gap-lg">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-h1 text-h1 text-on-surface">Team</h2>
            <p className="font-body-sm text-body-sm text-slate-400">Manage team members and roles</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {TEAM_MEMBERS.map(member => (
            <Card 
              key={member.id} 
              className="flex flex-col p-md hover:border-amber-500/50 hover:bg-[#1B2430] transition-colors cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="flex items-center gap-md">
                <div className="relative">
                  <Avatar src={member.avatar} alt={member.name} className="w-12 h-12" />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#161D27] rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-slate-500'}`}></span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-on-surface text-lg">{member.name}</span>
                  <span className="text-sm text-slate-400">{member.role}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
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

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'StudentFeed.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// The file is broken around `].map((user) => (`
// Let's replace the broken structure with a clean layout.
// I will use regex to find the `// FEED POSTS` section up to `// Kulüpler Vitrini` and restore it properly.

const startMarker = '{/* FEED POSTS */}';
const endMarker = '{/* Kulüpler Vitrini */}';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const newContent = `
          {/* FEED POSTS */}
          <div className="space-y-6">
            {(() => {
              const allItems = combineFeedItems(posts, events, news, announcements, jobs);
              const filtered = allItems.filter(post => post.content?.toLowerCase().includes(searchQuery.toLowerCase()) || post.author?.name?.toLowerCase().includes(searchQuery.toLowerCase()));
              
              if (filtered.length === 0) {
                return (
                  <div className="p-10 text-center bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-16 h-16 bg-red-50 text-[#0A2342] rounded-2xl flex items-center justify-center mb-6 shadow-sm"><FileText size={32} /></div>
                    <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Henüz görüntülenecek yayın bulunmuyor.</h3>
                    <p className="text-sm text-gray-500 font-medium max-w-sm leading-relaxed">Duyuru, etkinlik, staj ve mentorluk içerikleri yayınlandığında burada görünecek.</p>
                  </div>
                );
              }
              
              return filtered.map(post => (
                <PostCard key={post.id} post={post} currentUser={currentUser}  students={students || []} alumni={alumni || []} setPosts={setPosts} />
              ));
            })()}
          </div>
          </div>
        )}

        {/* SURVEYS TAB */}
        {featureSurveys && activeTab === 'surveys' && (
          <div className="w-full shrink-0 animate-fade-in mb-6">
            <AlumniSurveys surveys={surveys} currentUser={currentUser} />
          </div>
        )}

        {/* CLUBS TAB */}
        {featureClubsShowcase && activeTab === 'clubs' && (
          <div className="w-full shrink-0 animate-fade-in mb-6">
            <ClubsDirectory clubs={clubs} setClubs={setClubs} clubApplications={clubApplications} setClubApplications={setClubApplications} currentUser={currentUser} featureClubApplications={featureClubApplications} />
          </div>
        )}

        </div>

        {/* RIGHT PANEL: Dynamic Data */}
        <div className="hidden xl:block w-[300px] shrink-0 space-y-6">
          <DailyQuestsPanel />
          
          {/* Senin İçin Önerilenler (Instagram Style) */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-500 text-[13px]">Senin için önerilenler</h3>
              <button className="text-gray-900 text-[12px] font-bold hover:text-gray-500 transition-colors">Tümünü gör</button>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Mock Suggestions */}
              {[
                { id: 1, name: 'Ayşe Yılmaz', subtitle: 'Senin için öneriliyor', role: 'İşletme Öğrencisi', verified: false },
                { id: 2, name: 'Caner Demir', subtitle: 'Ahmet ve 2 diğer kişi takip ediyor', role: 'Yazılım Mezunu', verified: true },
                { id: 3, name: 'Zeynep Kaya', subtitle: 'Senin için öneriliyor', role: 'Tasarım', verified: false }
              ].map((user) => (
                <div key={user.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <img 
                      src={\`https://ui-avatars.com/api/?name=\${encodeURIComponent(user.name)}&background=random\`} 
                      className="w-10 h-10 rounded-full object-cover group-hover:scale-105 transition-transform" 
                      alt={user.name} 
                    />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-900 flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                        {user.name.toLowerCase().replace(' ', '_')}
                        {user.verified && <span className="text-blue-500"><CheckCircle2 size={12} className="fill-current text-white" /></span>}
                      </span>
                      <span className="text-[11px] text-gray-500 truncate w-32">{user.subtitle}</span>
                    </div>
                  </div>
                  <button className="text-[12px] font-bold text-blue-500 hover:text-gray-900 transition-colors">Takip Et</button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-50 text-[11px] text-gray-400 flex flex-wrap gap-x-2 gap-y-1">
              <span>Hakkında</span> · <span>Yardım</span> · <span>İş Fırsatları</span> · <span>Gizlilik</span> · <span>Koşullar</span>
              <p className="w-full mt-2 uppercase tracking-wider text-[10px]">© 2026 GELISIM KARIYER</p>
            </div>
          </div>

          `;

  content = content.substring(0, startIdx) + newContent + content.substring(endIdx);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Fixed successfully.');
} else {
  console.log('Markers not found!');
}

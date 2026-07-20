import fs from 'fs';
import path from 'path';

const filePath = 'src/components/StudentFeed.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `                  <div className="flex justify-center gap-6 border-y border-gray-50 py-4 mb-4">
                    <div className="text-center cursor-pointer group">
                      <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Ağım</p>
                      <p className="text-[16px] font-black text-gray-900 group-hover:text-teal-700 transition">120</p>
                  <div className="p-10 text-center bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[300px]">`;

const fixedStr = `                  <div className="flex justify-center gap-6 border-y border-gray-50 py-4 mb-4">
                    <div className="text-center cursor-pointer group">
                      <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Ağım</p>
                      <p className="text-[16px] font-black text-gray-900 group-hover:text-teal-700 transition">120</p>
                    </div>
                    <div className="w-px bg-gray-100"></div>
                    <div className="text-center cursor-pointer group">
                      <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-0.5">Gönderi</p>
                      <p className="text-[16px] font-black text-gray-900 group-hover:text-teal-700 transition">15</p>
                    </div>
                  </div>
                  <button onClick={() => setView('user_profile')} className="w-full py-2.5 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-xl text-[13px] font-bold transition-colors">
                    Kariyer Durumunu Güncelle
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CENTER PANEL: Stories & Feed */}
        <div className="w-full max-w-[600px] shrink-0 space-y-6">
          
        {/* Create Post Native View */}
        {activeTab === 'create_post' && (
          <div className="bg-white rounded-3xl w-full p-4 sm:p-6 shadow-[var(--shadow-soft)] border border-[var(--border-soft)] animate-fade-in mb-6">
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <Star className="text-orange-500 fill-current" size={24} /> Gönderi Paylaş & Düzenle
             </h2>
             <PostComposer currentUser={currentUser} userRole={userRole} posts={posts} setPosts={setPosts} />
          </div>
        )}

        {/* Explore Native View */}
        {activeTab === 'search' && (
          <ExploreFeed posts={posts} />
        )}

        {/* FEED TAB */}
        {activeTab === 'feed' && (
          <div className="w-full shrink-0 flex flex-col gap-6 animate-fade-in">
          
          {/* STORIES */}
          <StoriesBar currentUser={currentUser} stories={stories} setStories={setStories} />
          
          {/* FEED POSTS */}
          <div className="space-y-6">
            {(() => {
              const allItems = combineFeedItems(posts, events, news, announcements, jobs);
              const filtered = allItems.filter(post => post.content?.toLowerCase().includes(searchQuery.toLowerCase()) || post.author?.name?.toLowerCase().includes(searchQuery.toLowerCase()));
              
              if (filtered.length === 0) {
                return (
                  <div className="p-10 text-center bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[300px]">`;

// Using Regex to ignore character encoding issues matching
const regexStr = /<div className="flex justify-center gap-6 border-y border-gray-50 py-4 mb-4">\s*<div className="text-center cursor-pointer group">\s*<p className="text-gray-500 text-\[11px\] font-bold uppercase tracking-wider mb-0\.5">.*?<\/p>\s*<p className="text-\[16px\] font-black text-gray-900 group-hover:text-teal-700 transition">120<\/p>\s*<div className="p-10 text-center bg-white rounded-\[2rem\] border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-\[300px\]">/;

if (regexStr.test(content)) {
    content = content.replace(regexStr, fixedStr);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Fixed StudentFeed.jsx!");
} else {
    console.log("Could not find the broken pattern!");
}

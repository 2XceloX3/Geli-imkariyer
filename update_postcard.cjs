const fs = require('fs');

let content = fs.readFileSync('src/components/PostCard.jsx', 'utf8');

// 1. Add showHeart state
if (!content.includes('const [showHeart, setShowHeart] = useState(false)')) {
  content = content.replace(
    /const \[liked, setLiked\] = useState\(post\?\.likes > 0\);/,
    `const [liked, setLiked] = useState(post?.likes > 0);\n  const [showHeart, setShowHeart] = useState(false);`
  );
}

// 2. Add handleDoubleTap
if (!content.includes('const handleDoubleTap = useCallback')) {
  content = content.replace(
    /const handleLikeToggle = useCallback\(\(\) => \{/,
    `const handleDoubleTap = useCallback(() => {
    if (!liked) handleLikeToggle();
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  }, [liked]);

  const handleLikeToggle = useCallback(() => {`
  );
}

// 3. Update Image div to support double tap and show floating heart
const imageTarget = `<img src={post.image} alt="Post Cover" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />`;
const imageReplacement = `<img src={post.image} alt="Post Cover" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {showHeart && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <Heart size={80} className="text-white fill-current animate-[ping_1s_ease-out_forwards] opacity-0" />
              <Heart size={80} className="text-white fill-current absolute animate-[scale-up_0.3s_ease-out_forwards] drop-shadow-2xl" />
            </div>
          )}`;

if (content.includes(imageTarget) && !content.includes('showHeart &&')) {
  content = content.replace(
    /<div className="w-full aspect-video bg-gray-100 relative group cursor-pointer overflow-hidden border-y border-gray-50">/,
    `<div className="w-full aspect-video bg-gray-100 relative group cursor-pointer overflow-hidden border-y border-gray-50 select-none" onDoubleClick={handleDoubleTap}>`
  );
  content = content.replace(imageTarget, imageReplacement);
}

// 4. Update the interaction bar to make it look more LinkedIn (cleaner buttons)
// We'll replace the existing interaction buttons with more modern gray-blue tones
const actionTarget = `<button 
            aria-label="Beğen"
            onClick={handleLikeToggle}
            className={\`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-[14px] active:scale-95 \${liked ? 'text-white bg-gradient-to-r from-[var(--brand-navy)] to-[var(--brand-secondary)] shadow-md hover:shadow-lg' : 'text-gray-600 hover:bg-[var(--brand-soft-blue)] hover:text-[var(--brand-navy)]'}\`}
          >
            <Heart size={20} className={liked ? 'fill-current' : ''} /> 
            <span className="hidden sm:inline">{post?.likes || 0}</span>
          </button>
          <button 
            aria-label="Yorumları Aç"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--surface-soft)] rounded-xl text-gray-600 transition-colors font-bold text-[14px] active:scale-95">
            <MessageCircle size={20} className="text-gray-500" /> <span className="hidden sm:inline">{0 + comments.length}</span>
          </button>`;

const actionReplacement = `<button 
            aria-label="Beğen"
            onClick={handleLikeToggle}
            className={\`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all font-bold text-[13px] sm:text-[14px] active:scale-95 \${liked ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}\`}
          >
            <Heart size={20} className={\`\${liked ? 'fill-current scale-110' : ''} transition-transform\`} /> 
            <span className="hidden sm:inline">Beğen</span>
            <span className="text-xs font-semibold ml-1 px-1.5 py-0.5 bg-gray-100/50 rounded-md text-gray-500">{post?.likes || 0}</span>
          </button>
          <button 
            aria-label="Yorumları Aç"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 transition-all font-bold text-[13px] sm:text-[14px] active:scale-95">
            <MessageCircle size={20} /> 
            <span className="hidden sm:inline">Yorum Yap</span>
            <span className="text-xs font-semibold ml-1 px-1.5 py-0.5 bg-gray-100/50 rounded-md text-gray-500">{0 + comments.length}</span>
          </button>`;

if (content.includes('aria-label="Beğen"')) {
  // Using a regex block to replace the action section since it might have subtle differences
  content = content.replace(/<button[^>]*aria-label="Beğen"[\s\S]*?<span className="hidden sm:inline">\{0 \+ comments\.length\}<\/span>\s*<\/button>/, actionReplacement);
}

fs.writeFileSync('src/components/PostCard.jsx', content);
console.log('Updated PostCard to have double tap and LinkedIn style actions');

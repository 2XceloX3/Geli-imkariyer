const fs = require('fs');
const path = 'C:\\Users\\celil\\.gemini\\antigravity\\scratch\\Gelisim_Kariyer\\src\\components\\PostCard.jsx';
let content = fs.readFileSync(path, 'utf-8');

// 1. Wrap in React.memo and update imports
content = content.replace(
  "import React, { useState, useEffect } from 'react';",
  "import React, { useState, useEffect, useCallback, memo } from 'react';"
);

content = content.replace(
  "export default function PostCard({ post, currentUser, setPosts, setMessages }) {",
  "const PostCard = memo(function PostCard({ post, currentUser, setPosts, setMessages }) {"
);

content = content.replace(
  /\n}\n*$/,
  "\n});\nexport default PostCard;\n"
);
content = content.replace(
  /\n\}\n\s*$/,
  "\n});\nexport default PostCard;\n"
);

// 2. useCallback hooks
content = content.replace(
  "const handleSurveySubmit = () => {",
  "const handleSurveySubmit = useCallback(() => {"
).replace(
  "    setTimeout(() => {\n      setIsSurveyModalOpen(false);\n    }, 2000);\n  };",
  "    setTimeout(() => {\n      setIsSurveyModalOpen(false);\n    }, 2000);\n  }, [post?.id, currentUser?.id, surveyAnswers, setPosts]);"
);

content = content.replace(
  "const renderBadges = (badgeData) => {",
  "const renderBadges = useCallback((badgeData) => {"
).replace(
  "        })}\n      </div>\n    );\n  };",
  "        })}\n      </div>\n    );\n  }, []);"
);

content = content.replace(
  "const handleLikeToggle = () => {",
  "const handleLikeToggle = useCallback(() => {"
).replace(
  "      ));\n    }\n  };",
  "      ));\n    }\n  }, [liked, post?.id, setPosts]);"
);

content = content.replace(
  "const handleAddComment = () => {",
  "const handleAddComment = useCallback(() => {"
).replace(
  "setNewComment('');\n  };",
  "setNewComment('');\n  }, [newComment, comments, currentUser?.name]);"
);

content = content.replace(
  "const handleCopyLink = () => {",
  "const handleCopyLink = useCallback(() => {"
).replace(
  'window.toast.success("Bağlantı kopyalandı!");\n  };',
  'window.toast.success("Bağlantı kopyalandı!");\n  }, [post?.id]);'
);

content = content.replace(
  "const handleWhatsappShare = () => {",
  "const handleWhatsappShare = useCallback(() => {"
).replace(
  "window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');\n  };",
  "window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');\n  }, [post?.id, post?.title]);"
);

content = content.replace(
  "const handleDiscordShare = () => {",
  "const handleDiscordShare = useCallback(() => {"
).replace(
  'window.toast.info("Link kopyalandı. Discord\'a yapıştırabilirsiniz!");\n  };',
  'window.toast.info("Link kopyalandı. Discord\'a yapıştırabilirsiniz!");\n  }, [post?.id]);'
);

content = content.replace(
  "const handleShare = () => {",
  "const handleShare = useCallback(() => {"
).replace(
  'window.toast.success("Gönderi başarıyla paylaşıldı!");\n  };',
  'window.toast.success("Gönderi başarıyla paylaşıldı!");\n  }, [shareTarget, shareText, post?.content, currentUser?.id, setMessages]);'
);

content = content.replace(
  "const handleSaveEdit = () => {",
  "const handleSaveEdit = useCallback(() => {"
).replace(
  "setIsEditing(false);\n    setIsMenuOpen(false);\n  };",
  "setIsEditing(false);\n    setIsMenuOpen(false);\n  }, [post?.id, editContent, setPosts]);"
);

content = content.replace(
  "const handleDelete = () => {",
  "const handleDelete = useCallback(() => {"
).replace(
  "      if (setPosts) {\n        setPosts(prev => prev.filter(p => p.id !== post.id));\n      }\n    }\n  };",
  "      if (setPosts) {\n        setPosts(prev => prev.filter(p => p.id !== post.id));\n      }\n    }\n  }, [post?.id, setPosts]);"
);

// 3. UI Updates
content = content.replace(
  'className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[var(--border-soft)] shadow-[var(--shadow-soft)] overflow-hidden transition-all hover:shadow-lg"',
  'className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[var(--border-soft)] shadow-[var(--shadow-soft)] overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"'
);

// 4. Buttons - active:scale-95 and aria labels
content = content.replace(/<button([^>]*)>/g, (match, attrs) => {
  let newAttrs = attrs;
  if (!attrs.includes('active:scale-95') && !attrs.includes('active:scale-[0.98]')) {
    if (newAttrs.includes('className="')) {
      newAttrs = newAttrs.replace('className="', 'className="active:scale-95 ');
    } else if (newAttrs.includes('className={`')) {
      newAttrs = newAttrs.replace('className={`', 'className={`active:scale-95 ');
    } else {
      newAttrs += ' className="active:scale-95"';
    }
  }
  return `<button${newAttrs}>`;
});

// Fix specific aria labels
content = content.replace('<button onClick={() => setIsMenuOpen(!isMenuOpen)}', '<button aria-label="Menüyü Aç" onClick={() => setIsMenuOpen(!isMenuOpen)}');
content = content.replace('<button onClick={() => setIsEditing(true)}', '<button aria-label="Düzenle" onClick={() => setIsEditing(true)}');
content = content.replace('<button onClick={() => setIsEditing(false)}', '<button aria-label="İptal" onClick={() => setIsEditing(false)}');
content = content.replace('<button onClick={handleSaveEdit}', '<button aria-label="Kaydet" onClick={handleSaveEdit}');
content = content.replace('<button onClick={handleDelete}', '<button aria-label="Sil" onClick={handleDelete}');
content = content.replace('<button onClick={() => window.toast.info', '<button aria-label="İndir" onClick={() => window.toast.info');
content = content.replace('<button \n            onClick={handleLikeToggle}', '<button \n            aria-label="Beğen"\n            onClick={handleLikeToggle}');
content = content.replace('<button \n            onClick={() => setShowComments(!showComments)}', '<button \n            aria-label="Yorumlar"\n            onClick={() => setShowComments(!showComments)}');
content = content.replace('<button \n            onClick={() => setBookmarked(!bookmarked)}', '<button \n            aria-label="Kaydet"\n            onClick={() => setBookmarked(!bookmarked)}');
content = content.replace('<button onClick={() => setIsShareModalOpen(true)}', '<button aria-label="Paylaş" onClick={() => setIsShareModalOpen(true)}');
content = content.replace('<button onClick={() => setIsShareModalOpen(false)}', '<button aria-label="Kapat" onClick={() => setIsShareModalOpen(false)}');
content = content.replace('<button onClick={handleWhatsappShare}', '<button aria-label="WhatsApp" onClick={handleWhatsappShare}');
content = content.replace('<button onClick={handleDiscordShare}', '<button aria-label="Discord" onClick={handleDiscordShare}');
content = content.replace('<button onClick={handleCopyLink}', '<button aria-label="Kopyala" onClick={handleCopyLink}');
content = content.replace('<button onClick={handleShare}', '<button aria-label="Paylaş Gönder" onClick={handleShare}');
content = content.replace('<button onClick={() => window.toast.success', '<button aria-label="Başvur" onClick={() => window.toast.success');
content = content.replace('<button onClick={() => setIsSurveyModalOpen(true)}', '<button aria-label="Ankete Katıl" onClick={() => setIsSurveyModalOpen(true)}');
content = content.replace('<button onClick={() => setIsSurveyModalOpen(false)}', '<button aria-label="Kapat" onClick={() => setIsSurveyModalOpen(false)}');
content = content.replace('<button\n                                  key={score}', '<button\n                                  aria-label={`Puan ${score}`}\n                                  key={score}');
content = content.replace('<button \n                      onClick={handleSurveySubmit}', '<button \n                      aria-label="Gönder"\n                      onClick={handleSurveySubmit}');
content = content.replace('aria-label="İşlem Butonu"', 'aria-label="Yorum Gönder"');

// Catch a few remaining cases
content = content.replace(
  `<button onClick={() => { setIsMenuOpen(false); window.toast.success('Şikayetiniz Kariyer Geliştirme Merkezine iletilmiştir. Teşekkür ederiz.'); }}`,
  `<button aria-label="Şikayet Et" onClick={() => { setIsMenuOpen(false); window.toast.success('Şikayetiniz Kariyer Geliştirme Merkezine iletilmiştir. Teşekkür ederiz.'); }}`
);

fs.writeFileSync(path, content, 'utf-8');
console.log('Refactor complete.');

const fs = require('fs');

const feeds = [
  'src/components/StudentFeed.jsx',
  'src/components/AlumniFeed.jsx',
  'src/components/CompanyFeed.jsx'
];

const newsBlock = `
          {/* KGM Haberleri (LinkedIn News Style) */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-gray-900 text-[15px]">KGM Haberleri</h3>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                { id: 1, title: 'Yeni Kariyer Fuarı Duyuruldu', time: '12 saat önce', readers: '4.2B okuyucu' },
                { id: 2, title: 'Yapay Zeka ve İstihdam Raporu', time: '1 gün önce', readers: '3.1B okuyucu' },
                { id: 3, title: 'Mezunlar Zirvesi Başlıyor', time: '2 gün önce', readers: '8.4B okuyucu' },
                { id: 4, title: 'Yurtdışı Staj Programları', time: '3 gün önce', readers: '5.2B okuyucu' }
              ].map((news) => (
                <div key={news.id} className="group cursor-pointer">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                        {news.title}
                      </span>
                      <span className="text-[11px] text-gray-500 mt-0.5">
                        {news.time} • {news.readers}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 w-full bg-gray-50 hover:bg-gray-100 py-1.5 justify-center rounded-lg">
              Daha fazla göster <ChevronDown size={14} />
            </button>
          </div>
`;

feeds.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find where right panel starts and insert the news block right after the first div opening the Right Panel
    // Wait, the right panel starts with `<div className="hidden xl:block w-[300px] shrink-0 space-y-6">`
    const rightPanelStart = `<div className="hidden xl:block w-[300px] shrink-0 space-y-6">`;
    if (content.includes(rightPanelStart) && !content.includes('KGM Haberleri')) {
      content = content.replace(rightPanelStart, rightPanelStart + newsBlock);
      fs.writeFileSync(file, content);
      console.log('Added LinkedIn-style news block to', file);
    }
  }
});

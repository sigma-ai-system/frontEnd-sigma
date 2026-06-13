const fs = require('fs');
let content = fs.readFileSync('src/pages/landing/LandingPage.jsx', 'utf8');

content = content.replace(
  '<div className="stat-icon-box bg-blue"><PiStudent className="text-blue" /></div>',
  '<img src={LogoTentang1} alt="Mahasiswa Terdaftar" className="stat-img-icon" />'
);

content = content.replace(
  '<div className="stat-icon-box bg-green"><PiGraduationCap className="text-green" /></div>',
  '<img src={LogoTentang2} alt="Dosen Pembimbing" className="stat-img-icon" />'
);

content = content.replace(
  '<div className="stat-icon-box bg-purple"><PiBank className="text-purple" /></div>',
  '<img src={LogoTentang3} alt="Program Studi Bergabung" className="stat-img-icon" />'
);

content = content.replace(
  '<div className="stat-icon-box bg-orange"><PiChartLineUp className="text-orange" /></div>',
  '<img src={LogoTentang4} alt="Akurasi Model AI" className="stat-img-icon" />'
);

fs.writeFileSync('src/pages/landing/LandingPage.jsx', content);

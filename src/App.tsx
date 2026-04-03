import React, { useState, useEffect } from 'react';
import './App.css';

// --- Icons ---
const IconSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconFilter = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>;
const IconUpload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const IconChevronRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
const IconHome = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconMore = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>;
const IconImage = ({ size = 24 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;

import { supabase } from './lib/supabase';

// Force Refresh - Timestamp: 4:32 PM

const IconPhysics = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#94a3b8" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#94a3b8" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#94a3b8" strokeWidth="1.2"/></svg>;
const IconChemistry = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 3h10v4l-5 8v6h-4v-6L3 7V3h4z" stroke="#6366f1" strokeWidth="1.5" fill="#6366f1" fillOpacity="0.1"/><path d="M8.5 3v4.5M15.5 3v4.5M6 18h12" stroke="#94a3b8" strokeWidth="1.5"/></svg>;
const IconMaths = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#94a3b8" strokeWidth="1.5" fill="#6366f1" fillOpacity="0.1"/><path d="M7 8h4M9 6v4M13 8h4M7 16h4M15 14v4M13 16h4M15 16l-2-2m2 2l2 2m-2-2l2-2m-2 2l-2 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconScience = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" stroke="#6366f1" strokeWidth="1.5" fill="#6366f1" fillOpacity="0.1"/><circle cx="12" cy="12" r="4" stroke="#94a3b8" strokeWidth="1.5"/></svg>;
const IconICT = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="12" rx="2" stroke="#94a3b8" strokeWidth="1.5" fill="#6366f1" fillOpacity="0.1"/><path d="M7 20h10M12 16v4" stroke="#94a3b8" strokeWidth="1.5"/><path d="M8 8l2 2-2 2M13 12h3" stroke="#6366f1" strokeWidth="1.5"/></svg>;
const IconSocial = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#94a3b8" strokeWidth="1.5" fill="#6366f1" fillOpacity="0.1"/><path d="M12 3v18M3 12h18" stroke="#94a3b8" strokeWidth="1.5" strokeOpacity="0.5"/><path d="M12 3a18.3 18.3 0 000 18M12 3a18.3 18.3 0 010 18" stroke="#6366f1" strokeWidth="1.5"/></svg>;
const IconEnglish = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5z" stroke="#94a3b8" strokeWidth="1.5" fill="#6366f1" fillOpacity="0.1"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#6366f1" strokeWidth="1.5"/></svg>;

const subjects = [
  { name: 'Physics', icon: <IconPhysics /> },
  { name: 'Chemistry', icon: <IconChemistry /> },
  { name: 'Elective Maths', icon: <IconMaths /> },
  { name: 'Core Maths', icon: <IconMaths /> },
  { name: 'Integrated Science', icon: <IconScience /> },
  { name: 'Elective ICT', icon: <IconICT /> },
  { name: 'Social Studies', icon: <IconSocial /> },
  { name: 'English', icon: <IconEnglish /> },
];

function App() {
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'details'>('grid');
  const [papers, setPapers] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPapers = async (subject: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .eq('subject', subject)
      .order('created_at', { ascending: false });

    setIsLoading(false);
    if (error) {
      console.error('Error fetching papers:', error);
    } else {
      setPapers(data || []);
    }
  };

  useEffect(() => {
    if (activeSub && view === 'details') {
      fetchPapers(activeSub);
    }
  }, [activeSub, view]);

  const handleSubClick = (name: string) => {
    setActiveSub(name);
    setView('details');
  };

  const handleBack = () => {
    setView('grid');
    setActiveSub(null);
  };

  const [searchQuery, setSearchQuery] = useState('');

  // Handle Search Input Change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filtered Subjects and Papers
  const filteredSubjects = subjects.filter(s => s.name.toLowerCase().includes(searchQuery));
  const filteredPapers = papers.filter(p => p.name.toLowerCase().includes(searchQuery));

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
    if (!filesList || filesList.length === 0 || !activeSub) return;

    setIsUploading(true);
    const uploadedFiles = Array.from(filesList);

    try {
      // Parallel upload processing for better performance
      await Promise.all(uploadedFiles.map(async (file) => {
        const fileName = `${activeSub}/${Date.now()}_${file.name}`;

        // 1. Upload to Storage
        const { error: storageError } = await supabase.storage
          .from('papers')
          .upload(fileName, file);

        if (storageError) throw storageError;

        // 2. Get Public URL
        const { data: publicUrlData } = supabase.storage
          .from('papers')
          .getPublicUrl(fileName);

        // 3. Save to Database
        const { error: dbError } = await supabase
          .from('papers')
          .insert([{
            subject: activeSub,
            url: publicUrlData.publicUrl,
            name: file.name
          }]);

        if (dbError) throw dbError;
      }));

      // 4. Refresh List once all are done
      await fetchPapers(activeSub);
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Failed to upload one or more images. Please ensure the "papers" bucket and table exist.');
    } finally {
      setIsUploading(false);
      // Clear input so same file can be selected again
      event.target.value = '';
    }
  };

  const triggerFileInput = () => {
    const input = document.getElementById('file-input');
    if (input) (input as HTMLInputElement).click();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-glass">
        {/* Hidden File Input for Global Trigger */}
        <input 
          type="file" 
          id="file-input" 
          accept="image/*" 
          multiple 
          style={{ display: 'none' }} 
          onChange={handleFileUpload} 
          disabled={isUploading}
        />
        
        <header className="header">
          <div className="header-left">
            <h1 className="title" style={{ cursor: 'pointer' }} onClick={handleBack}>
              {view === 'grid' ? 'Casio Web App' : activeSub}
            </h1>
            <div className="stats">
              {view === 'grid' ? (
                <>
                  <span>{subjects.length} subjects available</span>
                  <span>•</span>
                  <span>100% Prepared</span>
                </>
              ) : (
                <>
                  <span>{papers.length} Papers Uploaded</span>
                  <span>•</span>
                  {isUploading ? <span>Uploading...</span> : <span>Ready for scan</span>}
                </>
              )}
            </div>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <IconSearch />
              <input 
                type="text" 
                placeholder={view === 'grid' ? "Search subjects..." : "Search papers..."} 
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="filter-btn"><IconFilter /></button>
            </div>
            <div className="action-icons">
              {view === 'details' && (
                <button 
                  className={`circle-btn ${isUploading ? 'spinning' : ''}`} 
                  onClick={triggerFileInput}
                  disabled={isUploading}
                >
                  <IconUpload />
                </button>
              )}
              <div className="avatar" onClick={handleBack} style={{ cursor: 'pointer' }}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
            </div>
          </div>
        </header>

        <nav className="nav-bar">
          <div className="breadcrumbs">
            <IconHome />
            <IconChevronRight />
            <span style={{ cursor: 'pointer' }} onClick={handleBack}>Academic</span>
            <IconChevronRight />
            <span className={view === 'grid' ? "active-path" : ""} style={{ cursor: 'pointer' }} onClick={handleBack}>Subjects</span>
            {view === 'details' && (
              <>
                <IconChevronRight />
                <span className="active-path">{activeSub}</span>
              </>
            )}
          </div>
        </nav>

        {view === 'grid' ? (
          <main className="file-grid">
            {filteredSubjects.map((sub, idx) => (
              <div 
                key={idx} 
                className={`file-card ${activeSub === sub.name ? 'selected' : ''}`}
                onClick={() => handleSubClick(sub.name)}
              >
                <div className="file-icon-wrapper">
                  {sub.icon}
                </div>
                <div className="file-info">
                  <span className="file-name">{sub.name}</span>
                  <button className="more-btn" onClick={(e) => e.stopPropagation()}><IconMore /></button>
                </div>
              </div>
            ))}
          </main>
        ) : (
          <main className="upload-view">
            <div className="upload-zone" onClick={triggerFileInput}>
              <div className="upload-icon-circle">
                <IconImage size={48} />
              </div>
              <div className="upload-text">
                <h3>Upload {activeSub} Papers</h3>
                <p>Drag and drop your images here, or click to browse</p>
              </div>
              <button className="upload-confirm-btn" disabled={isUploading}>
                {isUploading ? 'Uploading Batch...' : 'Select Images'}
              </button>
            </div>

            <section className="recent-uploads">
              <div className="section-header">
                <h2>Subject Papers</h2>
                <span className="view-all">Viewing {filteredPapers.length} files</span>
              </div>
              
              {isLoading || isUploading ? (
                <div className="loading-state">
                  <div className="pulse-card"></div>
                  <div className="pulse-card"></div>
                  <div className="pulse-card"></div>
                </div>
              ) : filteredPapers.length > 0 ? (
                <div className="papers-grid">
                  {filteredPapers.map((paper) => (
                    <div key={paper.id} className="paper-card">
                      <img src={paper.url} alt={paper.name} />
                      <div className="paper-name">{paper.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  No papers uploaded for {activeSub} yet. 
                  {searchQuery ? " Try clearing your search." : ""}
                </div>
              )}
            </section>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;

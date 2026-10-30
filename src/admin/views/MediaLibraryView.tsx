import React, { useState, useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { MediaFile } from '../../types';
import { Upload, Search, Trash2, Copy, Check, Filter, Image as ImageIcon, Sparkles, AlertTriangle, ArrowRight, RefreshCw, Eye } from 'lucide-react';

export const MediaLibraryView: React.FC = () => {
  const {
    mediaFiles,
    saveMedia,
    deleteMedia,
    replaceMedia,
    checkMediaUsage,
    addToast,
    destinations,
    services,
    packages,
    heroSlides,
    updateHeroSlide,
    updateDestination,
    updateService,
    updatePackage,
    updateSettings,
  } = useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);

  // Staged Upload State
  const [stagedFiles, setStagedFiles] = useState<
    Array<{
      dataUrl: string;
      name: string;
      size: string;
      type: 'image' | 'video' | 'logo' | 'banner';
    }>
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Replace / Assign Modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter media files
  const filteredMedia = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || file.type === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  // Handle Drag & Drop / File Select
  const handleFileProcess = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const fileSizeKb = Math.round(file.size / 1024);
        const formattedSize = fileSizeKb > 1024 ? `${(fileSizeKb / 1024).toFixed(1)} MB` : `${fileSizeKb} KB`;

        let inferredType: 'image' | 'video' | 'logo' | 'banner' = 'image';
        if (file.name.toLowerCase().includes('logo')) inferredType = 'logo';
        else if (file.name.toLowerCase().includes('banner') || file.name.toLowerCase().includes('hero')) inferredType = 'banner';
        else if (file.type.includes('video')) inferredType = 'video';

        setStagedFiles((prev) => [
          ...prev,
          {
            dataUrl: result,
            name: file.name,
            size: formattedSize,
            type: inferredType,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileProcess(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Dedicated SAVE MEDIA Action
  const handleSaveStagedMedia = (index?: number) => {
    if (typeof index === 'number') {
      const target = stagedFiles[index];
      if (!target) return;
      saveMedia({
        name: target.name,
        url: target.dataUrl,
        type: target.type,
        size: target.size,
      });
      setStagedFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Save all staged
      stagedFiles.forEach((file) => {
        saveMedia({
          name: file.name,
          url: file.dataUrl,
          type: file.type,
          size: file.size,
        });
      });
      setStagedFiles([]);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    addToast('Media URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Usage check for delete
  const handleDeleteCheck = (media: MediaFile) => {
    const usages = checkMediaUsage(media.url);
    if (usages.length > 0) {
      alert(`⚠️ Cannot delete "${media.name}" because it is currently used in:\n\n• ${usages.join('\n• ')}\n\nPlease replace the image in those sections first.`);
      return;
    }

    if (confirm(`Are you sure you want to permanently delete "${media.name}" from the Media Library?`)) {
      deleteMedia(media.id);
      if (selectedMedia?.id === media.id) setSelectedMedia(null);
    }
  };

  // Apply to a section (Use Image)
  const handleAssignToSection = (targetType: string, targetId: string) => {
    if (!selectedMedia) return;

    if (targetType === 'hero') {
      updateHeroSlide(targetId, { imageUrl: selectedMedia.url });
      addToast(`Hero slide background updated with ${selectedMedia.name}`);
    } else if (targetType === 'destination') {
      updateDestination(targetId, { featuredImage: selectedMedia.url });
      addToast(`Destination featured image updated with ${selectedMedia.name}`);
    } else if (targetType === 'service') {
      updateService(targetId, { imageUrl: selectedMedia.url });
      addToast(`Service image updated with ${selectedMedia.name}`);
    } else if (targetType === 'package') {
      updatePackage(targetId, { featuredImage: selectedMedia.url });
      addToast(`Package image updated with ${selectedMedia.name}`);
    } else if (targetType === 'logo') {
      updateSettings({ logoImageUrl: selectedMedia.url });
      addToast(`Website header & footer logo updated with ${selectedMedia.name}`);
    }

    setShowAssignModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD7]">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8A6D3B] block">
            Digital Asset Repository & CDN
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B2017] tracking-tight">
            Media Library & Storage
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Store, replace, inspect, and assign permanent media assets across Islamabad Escapes.
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-5 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D8B574] text-[#07140E] hover:from-[#D8B574] hover:to-[#E8CF9B] rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload From Device</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFileProcess(e.target.files)}
        />
      </div>

      {/* Drag & Drop Upload Stage */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`p-6 sm:p-8 rounded-3xl border-2 border-dashed transition-all text-center ${
          isDragging
            ? 'border-[#C5A059] bg-[#0B2017]/5 scale-[1.01]'
            : 'border-[#D5CEC5] bg-white hover:border-[#C5A059]'
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#0B2017]/5 text-[#0B2017] flex items-center justify-center mx-auto shadow-xs border border-[#C5A059]/30">
            <Upload className="w-6 h-6 text-[#8A6D3B]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#0B2017]">
              Drag & Drop Images, Banners & Logos Here
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports JPEG, JFIF, PNG, WEBP, and MP4 up to 50MB.
            </p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#F3EFEA] hover:bg-[#EAE3DA] text-[#0B2017] rounded-xl text-xs font-semibold transition-colors border border-[#E0D7CB]"
          >
            Or Browse Files
          </button>
        </div>
      </div>

      {/* STAGED UPLOADS REVIEW & PROMINENT "SAVE MEDIA" BUTTON */}
      {stagedFiles.length > 0 && (
        <div className="p-6 bg-gradient-to-br from-[#FAF5EB] to-[#F3ECE0] rounded-2xl border-2 border-[#C5A059] shadow-xl space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B2017] flex items-center gap-1.5 font-mono">
                <Sparkles className="w-4 h-4 text-[#C5A059]" /> Staged Media Ready For Persistence
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                {stagedFiles.length} file(s) loaded in staging. Click &ldquo;Save Media&rdquo; to commit permanently to server disk.
              </p>
            </div>

            {/* Prominent SAVE MEDIA Button as requested */}
            <button
              onClick={() => handleSaveStagedMedia()}
              className="px-7 py-3.5 bg-gradient-to-r from-[#07140E] via-[#0B2017] to-[#143D2D] text-[#D8B574] hover:text-white rounded-xl text-xs font-extrabold uppercase tracking-widest hover:border-[#D8B574] shadow-xl hover:shadow-2xl transition-all border-2 border-[#C5A059] flex items-center gap-2 group"
            >
              <Check className="w-4 h-4 text-[#C5A059] group-hover:scale-125 transition-transform" />
              <span>SAVE MEDIA ({stagedFiles.length})</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {stagedFiles.map((file, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-[#D5CEC5] relative group flex flex-col justify-between">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 mb-2">
                  <img src={file.dataUrl} alt={file.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs font-semibold text-slate-800 truncate">{file.name}</div>
                <div className="text-[10px] text-slate-500 flex justify-between mt-1">
                  <span>{file.size}</span>
                  <span className="uppercase font-bold text-[#133826]">{file.type}</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => handleSaveStagedMedia(idx)}
                    className="flex-1 py-1.5 bg-[#133826] text-[#D4A373] hover:text-white text-[11px] font-bold rounded-lg transition-colors"
                  >
                    Save This
                  </button>
                  <button
                    onClick={() => setStagedFiles((prev) => prev.filter((_, i) => i !== idx))}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#D5CEC5] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#133826]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {['All', 'Banner', 'Image', 'Logo'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === t
                  ? 'bg-[#133826] text-[#D4A373]'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-[#E5DFD7]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredMedia.map((media) => {
          const usages = checkMediaUsage(media.url);
          const isSelected = selectedMedia?.id === media.id;

          return (
            <div
              key={media.id}
              onClick={() => setSelectedMedia(media)}
              className={`bg-white rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'border-[#133826] ring-2 ring-[#133826]/30 shadow-lg'
                  : 'border-[#E5DFD7] hover:border-[#133826]/50 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Thumbnail Area */}
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                <img
                  src={media.url}
                  alt={media.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[9px] uppercase font-bold text-white backdrop-blur-xs">
                  {media.type}
                </div>
                {usages.length > 0 && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-900/80 text-[9px] font-bold text-emerald-200 backdrop-blur-xs">
                    In Use ({usages.length})
                  </div>
                )}
              </div>

              {/* Info Area */}
              <div className="p-3.5">
                <div className="text-xs font-bold text-[#133826] truncate" title={media.name}>
                  {media.name}
                </div>
                <div className="text-[11px] text-slate-500 flex justify-between mt-1">
                  <span>{media.size}</span>
                  <span>{media.uploadedAt}</span>
                </div>

                {/* Quick 4 Option Buttons on Hover / Selection */}
                <div className="mt-3 pt-2.5 border-t border-[#F0EAE1] flex items-center justify-between gap-1 text-[11px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMedia(media);
                      setShowAssignModal(true);
                    }}
                    className="text-[#133826] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Use Image</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(media.url, media.id);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-700"
                      title="Copy URL"
                    >
                      {copiedId === media.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCheck(media);
                      }}
                      className="p-1 text-slate-400 hover:text-red-600"
                      title="Delete Media"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Media Inspector Drawer */}
      {selectedMedia && (
        <div className="p-6 bg-white rounded-3xl border border-[#D5CEC5] shadow-xl space-y-5 animate-in slide-in-from-bottom-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD7]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                <img src={selectedMedia.url} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#133826]">
                  {selectedMedia.name}
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Type: <strong className="uppercase text-slate-800">{selectedMedia.type}</strong> · Size: {selectedMedia.size} · Uploaded: {selectedMedia.uploadedAt}
                </div>
              </div>
            </div>

            {/* The 4 Required Options */}
            <div className="flex flex-wrap items-center gap-2">
              {/* 1. Save Media (already stored confirmation) */}
              <button
                onClick={() => addToast(`"${selectedMedia.name}" is securely stored in Media Library`, 'info')}
                className="px-3.5 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>1. Stored & Saved</span>
              </button>

              {/* 2. Use Image */}
              <button
                onClick={() => setShowAssignModal(true)}
                className="px-4 py-2 bg-[#133826] text-[#D4A373] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1B4332] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>2. Use Image</span>
              </button>

              {/* 3. Replace Image */}
              <button
                onClick={() => setShowReplaceModal(true)}
                className="px-3.5 py-2 bg-[#FAF8F5] text-[#133826] border border-[#D5CEC5] rounded-xl text-xs font-semibold hover:bg-[#F0EAE1] transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>3. Replace Image</span>
              </button>

              {/* 4. Delete */}
              <button
                onClick={() => handleDeleteCheck(selectedMedia)}
                className="px-3.5 py-2 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>4. Delete</span>
              </button>
            </div>
          </div>

          {/* Active Usages List */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Website Locations Using This Image:
            </span>
            {checkMediaUsage(selectedMedia.url).length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {checkMediaUsage(selectedMedia.url).map((use, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#E8F0EA] text-[#133826] text-xs font-medium border border-[#2D6A4F]/30"
                  >
                    ✓ {use}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">
                This media is not currently assigned to any website section. You can safely assign it or delete it.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Option 2 - Use Image */}
      {showAssignModal && selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-5">
            <h3 className="font-serif text-xl font-bold text-[#133826]">
              Use "{selectedMedia.name}" On Website
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select which section or component you wish to assign this photo to:
            </p>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {/* Header / Brand Logo */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Website Brand Logo</div>
                  <div className="text-[11px] text-slate-500">Header & Footer primary emblem</div>
                </div>
                <button
                  onClick={() => handleAssignToSection('logo', 'main-logo')}
                  className="px-3 py-1.5 bg-[#133826] text-[#D4A373] rounded-lg text-xs font-semibold"
                >
                  Set as Logo
                </button>
              </div>

              {/* Hero Slides */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Hero Section Backgrounds:
                </span>
                {heroSlides.map((slide) => (
                  <div key={slide.id} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-800 truncate max-w-[240px] font-medium">
                      {slide.title}
                    </span>
                    <button
                      onClick={() => handleAssignToSection('hero', slide.id)}
                      className="px-3 py-1 bg-[#133826] text-[#D4A373] rounded-lg text-xs font-semibold"
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>

              {/* Destinations */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Destinations Featured Image:
                </span>
                {destinations.map((d) => (
                  <div key={d.id} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-800 font-medium">{d.name}</span>
                    <button
                      onClick={() => handleAssignToSection('destination', d.id)}
                      className="px-3 py-1 bg-[#133826] text-[#D4A373] rounded-lg text-xs font-semibold"
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>

              {/* Packages */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Travel Packages:
                </span>
                {packages.map((p) => (
                  <div key={p.id} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-800 font-medium truncate max-w-[240px]">
                      {p.title}
                    </span>
                    <button
                      onClick={() => handleAssignToSection('package', p.id)}
                      className="px-3 py-1 bg-[#133826] text-[#D4A373] rounded-lg text-xs font-semibold"
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowAssignModal(false)}
              className="w-full py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal: Option 3 - Replace Image */}
      {showReplaceModal && selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#D4A373]/40 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#133826]">
              Replace Media Asset
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload a new file to replace <strong>{selectedMedia.name}</strong>. All sections of the website using this image will instantly update to the new file!
            </p>

            <input
              type="file"
              accept="image/*"
              className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#133826] file:text-[#D4A373] hover:file:bg-[#1B4332]"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const newUrl = ev.target?.result as string;
                  replaceMedia(selectedMedia.id, newUrl, file.name);
                  setShowReplaceModal(false);
                };
                reader.readAsDataURL(file);
              }}
            />

            <button
              onClick={() => setShowReplaceModal(false)}
              className="w-full py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

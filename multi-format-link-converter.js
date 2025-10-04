document.addEventListener('DOMContentLoaded', () => {

  // --- GLOBAL STATE & ELEMENTS ---
  let activeSectionId = 1; 
  let lastSelection = { range: null, sectionId: null }; // <-- FIX: To store the last user selection
  let debounceTimer;
  const statusMessage = document.getElementById('statusMessage');

  // Global action buttons
  const btnMakeLink = document.getElementById('makeLinkBtn');
  const btnClear = document.getElementById('clearBtn');
  const btnPreview = document.getElementById('previewBtn');
  const btnDownload = document.getElementById('downloadBtn');

  // Preview Modal elements
  const previewModal = document.getElementById('preview-modal');
  const closePreview = document.getElementById('close-preview');
  const previewContentArea = document.getElementById('preview-content-area');

  // --- UTILITY FUNCTIONS ---
  const showStatus = (msg, type = 'success', duration = 3000) => {
    statusMessage.textContent = msg;
    statusMessage.className = `status-${type}`;
    setTimeout(() => {
        statusMessage.textContent = '';
        statusMessage.className = '';
    }, duration);
  };
  
  const decodeHTML = (str) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  };
  
  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  const copyCode = (element) => {
    const text = element.textContent.trim();
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => showStatus('Copied to clipboard.'))
        .catch(() => showStatus('Copy failed.', 'error'));
    } else { // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showStatus('Copied to clipboard.');
        } catch (err) {
            showStatus('Copy failed.', 'error');
        }
        document.body.removeChild(textarea);
    }
  };


  // --- CORE CONVERTER LOGIC ---
  const convertContent = (sectionId) => {
    const editor = document.getElementById(`editor-${sectionId}`);
    const outputSection = document.getElementById(`output-section-${sectionId}`);
    
    let content = editor.innerHTML;
    if (editor.innerText.trim() === '') {
        outputSection.classList.remove('visible');
        return;
    }

    content = content.replace(/<(div|p|br)[^>]*>/gi, '\n').replace(/<\/(div|p)>/gi, '\n\n');
    content = content.replace(/\s*target=["']?_blank["']?/gi, '');
    content = content.replace(/<(?!a\s|\/a)[^>]+>/gi, '');

    const anchorRegex = /<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
    let refCounter = 1;
    let refList = '';
    const linksArray = [];

    // Extract links for JSON and other formats
    let match;
    while ((match = anchorRegex.exec(content)) !== null) {
        linksArray.push({ url: decodeHTML(match[1]), text: decodeHTML(match[2].trim() || match[1]) });
    }
    anchorRegex.lastIndex = 0; // Reset regex index

    // Generate different formats
    const htmlVersion = decodeHTML(content);
    const markdownVersion = content.replace(anchorRegex, (_, href, text) => `[${decodeHTML(text.trim() || href)}](${decodeHTML(href)})`);
    const bbcodeVersion = content.replace(anchorRegex, (_, href, text) => `[url=${decodeHTML(href)}]${decodeHTML(text.trim() || href)}[/url]`);
    const rawVersion = decodeHTML(content.replace(anchorRegex, (_, href, text) => `${decodeHTML(text.trim() || href)} (${decodeHTML(href)})`)).replace(/<[^>]+>/gi, '');
    const slackVersion = content.replace(anchorRegex, (_, href, text) => `<${decodeHTML(href)}|${decodeHTML(text.trim() || href)}>`);
    const jsonVersion = JSON.stringify(linksArray, null, 2);
    
    const refMarkdownVersion = content.replace(anchorRegex, (_, href, text) => {
        const label = refCounter++;
        refList += `[${label}]: ${decodeHTML(href)}\n`;
        return `[${decodeHTML(text.trim() || href)}][${label}]`;
    });
    
    // Update the DOM for the specific section
    document.querySelector(`#html-panel-${sectionId} pre`).textContent = htmlVersion;
    document.querySelector(`#markdown-panel-${sectionId} pre`).textContent = decodeHTML(markdownVersion);
    document.querySelector(`#bbcode-panel-${sectionId} pre`).textContent = decodeHTML(bbcodeVersion);
    document.querySelector(`#raw-panel-${sectionId} pre`).textContent = rawVersion;
    document.querySelector(`#slack-panel-${sectionId} pre`).textContent = decodeHTML(slackVersion);
    document.querySelector(`#json-panel-${sectionId} pre`).textContent = jsonVersion;
    document.querySelector(`#refmd-panel-${sectionId} pre`).textContent = decodeHTML(refMarkdownVersion + "\n\n" + refList.trim());

    outputSection.classList.add('visible');
  };


  // --- INITIALIZATION FOR EACH SECTION ---
  const initializeConverterSection = (sectionId) => {
    const editor = document.getElementById(`editor-${sectionId}`);
    const charCounter = document.getElementById(`char-counter-${sectionId}`);
    const tabButtons = document.querySelectorAll(`#section-${sectionId} .tab-button`);
    const tabContents = document.querySelectorAll(`#section-${sectionId} .tab-content`);
    const outputPres = document.querySelectorAll(`#section-${sectionId} pre`);

    // --- FIX: Save the selection range whenever the user interacts with the editor ---
    const saveSelection = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0 && editor.contains(selection.anchorNode)) {
            lastSelection.range = selection.getRangeAt(0);
            lastSelection.sectionId = sectionId;
        }
    };
    editor.addEventListener('keyup', saveSelection);
    editor.addEventListener('mouseup', saveSelection);
    editor.addEventListener('focus', saveSelection);
    // --- End of Fix ---

    // Set active section on focus for Clear/Preview/Download buttons
    editor.addEventListener('focus', () => {
        document.querySelectorAll('.editor').forEach(ed => ed.classList.remove('active'));
        editor.classList.add('active');
        activeSectionId = sectionId;
    });

    // Handle input with debouncing
    editor.addEventListener('input', () => {
      charCounter.textContent = `${editor.innerText.length} characters`;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => convertContent(sectionId), 300);
    });
    
    // Handle paste
    editor.addEventListener('paste', (e) => {
      e.preventDefault();
      const clipboardData = e.clipboardData || window.clipboardData;
      const pastedHTML = clipboardData.getData('text/html');
      const pastedText = clipboardData.getData('text/plain');
      if (pastedHTML) {
        document.execCommand('insertHTML', false, pastedHTML);
      } else if (pastedText) {
        const htmlWithLineBreaks = pastedText.replace(/\n/g, '<br>');
        document.execCommand('insertHTML', false, htmlWithLineBreaks);
      }
    });

    // Tab switching logic
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabId}-panel-${sectionId}`).classList.add('active');
        });
    });
    
    // Copy output on click
    outputPres.forEach(pre => pre.addEventListener('click', () => copyCode(pre)));
  };


  // --- GLOBAL ACTION FUNCTIONS ---
  const makeLink = () => {
    // --- FIX: Use the saved selection instead of the active section ID ---
    if (!lastSelection.range || !lastSelection.sectionId) {
        showStatus('Please select text in an editor first.', 'error');
        return;
    }
    
    const url = prompt("Enter the URL for the hyperlink:");
    if (!url) return;
    if (!isValidURL(url)) {
        showStatus('Please enter a valid URL', 'error');
        return;
    }
    
    // Restore the selection before executing the command
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(lastSelection.range);

    document.execCommand('createLink', false, url);

    // Re-convert the content of the correct section
    convertContent(lastSelection.sectionId);
    showStatus('Hyperlink added.');
    // --- End of Fix ---
  };

  const clearEditor = () => {
    const editor = document.getElementById(`editor-${activeSectionId}`);
    const outputSection = document.getElementById(`output-section-${activeSectionId}`);
    const charCounter = document.getElementById(`char-counter-${activeSectionId}`);
    if (editor.innerText.trim() !== '' && !confirm(`Are you sure you want to clear editor ${activeSectionId}?`)) {
      return;
    }
    editor.innerHTML = '';
    outputSection.classList.remove('visible');
    charCounter.textContent = '0 characters';
    showStatus(`Editor ${activeSectionId} cleared.`);
  };

  const previewLinks = () => {
    const editor = document.getElementById(`editor-${activeSectionId}`);
    const content = editor.innerHTML;
    const anchorRegex = /<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
    let previewHTML = '';
    let hasLinks = false;
    let match;

    while ((match = anchorRegex.exec(content)) !== null) {
      hasLinks = true;
      const url = decodeHTML(match[1]);
      const text = decodeHTML(match[2]);
      previewHTML += `<div style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 4px;">
          <h4>${text || 'No Text'}</h4>
          <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>
        </div>`;
    }

    previewContentArea.innerHTML = !hasLinks ? '<p>No links found in the active editor.</p>' : previewHTML;
    previewModal.style.display = 'flex';
  };
  
  const downloadOutput = () => {
      const section = document.getElementById(`section-${activeSectionId}`);
      const activeTab = section.querySelector('.tab-button.active');
      if(!activeTab){
          showStatus('Please generate some output first.', 'error');
          return;
      }
      const format = activeTab.dataset.tab;
      const content = section.querySelector(`#${format}-panel-${activeSectionId} pre`).textContent;
      
      const mimeTypes = { html: 'text/html', markdown: 'text/markdown', refmd: 'text/markdown', json: 'application/json' };
      const extensions = { markdown: 'md', refmd: 'md', bbcode: 'txt', raw: 'txt', slack: 'txt' };

      const filename = `links-${activeSectionId}.${extensions[format] || format}`;
      const mimeType = mimeTypes[format] || 'text/plain';
      
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showStatus(`Downloaded ${filename}`);
  };

  // --- EVENT LISTENERS FOR GLOBAL ACTIONS ---
  btnMakeLink.addEventListener('click', makeLink);
  btnClear.addEventListener('click', clearEditor);
  btnPreview.addEventListener('click', previewLinks);
  btnDownload.addEventListener('click', downloadOutput);

  // Preview Modal Listeners
  closePreview.addEventListener('click', () => previewModal.style.display = 'none');
  previewModal.addEventListener('click', (e) => {
    if (e.target === previewModal) previewModal.style.display = 'none';
  });
  
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  menuToggle.addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // --- INITIALIZE EVERYTHING ---
  initializeConverterSection(1);
  initializeConverterSection(2);
  document.getElementById('editor-1').classList.add('active'); 
});

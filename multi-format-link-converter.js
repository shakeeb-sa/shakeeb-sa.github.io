(function() {
  // Cache DOM elements
  const editor = document.getElementById('editor');
  const htmlOutput = document.getElementById('html');
  const markdownOutput = document.getElementById('markdown');
  const bbcodeOutput = document.getElementById('bbcode');
  const rawOutput = document.getElementById('raw');
  const refmdOutput = document.getElementById('refmd');
  const jsonOutput = document.getElementById('json');
  const slackOutput = document.getElementById('slack');
  const outputSection = document.getElementById('output');
  const statusMessage = document.getElementById('statusMessage');
  const btnMakeLink = document.getElementById('makeLinkBtn');
  const btnClear = document.getElementById('clearBtn');
  const btnPreview = document.getElementById('previewBtn');
  const btnDownload = document.getElementById('downloadBtn');
  const charCounter = document.getElementById('char-counter');
  const themeToggle = document.getElementById('theme-toggle');
  const historyToggle = document.getElementById('history-toggle');
  const historyPanel = document.getElementById('history-panel');
  const closeHistory = document.getElementById('close-history');
  const historyList = document.getElementById('history-list');
  const previewModal = document.getElementById('preview-modal');
  const closePreview = document.getElementById('close-preview');
  const previewContent = document.getElementById('preview-content');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Initialize variables
  let conversionHistory = JSON.parse(localStorage.getItem('linkConversionHistory')) || [];
  let currentFormat = 'html';
  let debounceTimer;
  
  // Initialize dark mode
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Utility: decode HTML entities
  function decodeHTML(str) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }
  
  // Show temporary status message
  function showStatus(msg, type = 'success') {
    statusMessage.textContent = msg;
    statusMessage.className = `status-${type}`;
    setTimeout(() => {
      statusMessage.textContent = '';
      statusMessage.className = '';
    }, 3000);
  }
  
  // Handle placeholder in contenteditable
  function setPlaceholder() {
    if (editor.innerText.trim() === '') {
      editor.classList.add('placeholder');
      editor.setAttribute('data-placeholder', 'Paste your content with links here...');
    } else {
      editor.classList.remove('placeholder');
    }
  }
  
  // Initialize placeholder
  function initPlaceholder() {
    setPlaceholder();
  }
  
  // Update character counter
  function updateCharCounter() {
    const count = editor.innerText.length;
    charCounter.textContent = `${count} characters`;
  }
  
  // Validate URL
  function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
  
  function convertContent() {
  let content = editor.innerHTML;
  
  // Remove all tags except <a> (if you want to keep only links)
  // But first, convert block elements to line breaks to preserve paragraph structure
  content = content.replace(/<(div|p|br)[^>]*>/gi, '\n');
  content = content.replace(/<\/(div|p)>/gi, '\n\n');
  
  // Remove target="_blank" attributes
  content = content.replace(/\s*target=["']?_blank["']?/gi, '');
  
  // Remove all other tags except <a>
  content = content.replace(/<(?!a\s|\/a)[^>]+>/gi, '');
  
  const anchorRegex = /<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let refCounter = 1;
  let refList = '';
  let linksArray = [];
  
  // Extract links for JSON format
  let match;
  while ((match = anchorRegex.exec(content)) !== null) {
    linksArray.push({
      url: decodeHTML(match[1]),
      text: decodeHTML(match[2])
    });
  }
  
  // Reset regex index
  anchorRegex.lastIndex = 0;
  
  // HTML output (decoded)
  const htmlVersion = decodeHTML(content);
  
  // Markdown
  const markdownVersion = content.replace(anchorRegex, (_, href, text) =>
    `[${decodeHTML(text)}](${decodeHTML(href)})`
  );
  
  // BBCode
  const bbcodeVersion = content.replace(anchorRegex, (_, href, text) =>
    `[url=${decodeHTML(href)}]${decodeHTML(text)}[/url]`
  );
  
  // Raw Text (with preserved paragraph structure) - FIXED
  let rawVersion = content.replace(anchorRegex, (_, href, text) =>
    `[${decodeHTML(href)} ${decodeHTML(text)}]`
  );
  rawVersion = decodeHTML(rawVersion).replace(/<[^>]+>/gi, '');
  
  // Reference Markdown with reference list
  const refMarkdownVersion = content.replace(anchorRegex, (_, href, text) => {
    const label = refCounter++;
    refList += `[${label}]: ${decodeHTML(href)}\n`;
    return `[${decodeHTML(text)}][${label}]`;
  });
  
  // JSON format
  const jsonVersion = JSON.stringify(linksArray, null, 2);
  
  // Slack format
  const slackVersion = content.replace(anchorRegex, (_, href, text) =>
    `<${decodeHTML(href)}|${decodeHTML(text)}>`
  );
  
  // Assign outputs
  htmlOutput.textContent = htmlVersion;
  markdownOutput.textContent = decodeHTML(markdownVersion);
  bbcodeOutput.textContent = decodeHTML(bbcodeVersion);
  rawOutput.textContent = rawVersion;
  refmdOutput.textContent = decodeHTML(refMarkdownVersion + "\n\n" + refList.trim());
  jsonOutput.textContent = jsonVersion;
  slackOutput.textContent = decodeHTML(slackVersion);
  
  outputSection.style.display = 'block';
  
  // Save to history if links exist
  if (linksArray.length > 0) {
    saveToHistory(linksArray);
  }
}
  
  // Save conversion to history
  function saveToHistory(links) {
    const timestamp = new Date().toISOString();
    const title = links.length === 1 ?
      links[0].text :
      `${links.length} links - ${new Date().toLocaleString()}`;
    
    const historyItem = {
      id: Date.now(),
      title: title,
      links: links,
      timestamp: timestamp
    };
    
    // Add to beginning of array
    conversionHistory.unshift(historyItem);
    
    // Limit history to 20 items
    if (conversionHistory.length > 20) {
      conversionHistory = conversionHistory.slice(0, 20);
    }
    
    // Save to localStorage
    localStorage.setItem('linkConversionHistory', JSON.stringify(conversionHistory));
    
    // Update history UI
    updateHistoryUI();
  }
  
  // Delete a single history item
  function deleteHistoryItem(id) {
    const index = conversionHistory.findIndex(item => item.id === id);
    if (index !== -1) {
      conversionHistory.splice(index, 1);
      localStorage.setItem('linkConversionHistory', JSON.stringify(conversionHistory));
      updateHistoryUI();
      showStatus('History item deleted', 'info');
    }
  }
  
  // Clear all history
  function clearAllHistory() {
    if (confirm('Are you sure you want to delete all conversion history? This cannot be undone.')) {
      conversionHistory = [];
      localStorage.removeItem('linkConversionHistory');
      updateHistoryUI();
      showStatus('All history cleared', 'info');
    }
  }
  
  // Update history UI
  function updateHistoryUI() {
    if (conversionHistory.length === 0) {
      historyList.innerHTML = '<p>No history yet. Convert some links to see them here.</p>';
      return;
    }
    
    historyList.innerHTML = '';
    conversionHistory.forEach(item => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="history-item-title">${item.title}</div>
        <div class="history-item-date">${new Date(item.timestamp).toLocaleString()}</div>
        <button class="delete-history" data-id="${item.id}" aria-label="Delete this history item">
          <i class="fas fa-trash"></i>
        </button>
      `;
      
      historyItem.addEventListener('click', () => {
        loadFromHistory(item);
        historyPanel.classList.remove('open');
      });
      
      // Add event listener to delete button
      const deleteButton = historyItem.querySelector('.delete-history');
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the parent click
        deleteHistoryItem(item.id);
      });
      
      historyList.appendChild(historyItem);
    });
  }
  
  // Load from history
  function loadFromHistory(item) {
    let htmlContent = '';
    item.links.forEach(link => {
      htmlContent += `<a href="${link.url}">${link.text}</a> `;
    });
    
    editor.innerHTML = htmlContent;
    setPlaceholder();
    convertContent();
    updateCharCounter();
    showStatus('Loaded from history', 'info');
  }
  
  // Make hyperlink
  function makeLink() {
    const url = prompt("Enter the URL for the hyperlink:");
    if (!url) return;
    
    if (!isValidURL(url)) {
      showStatus('Please enter a valid URL', 'error');
      return;
    }
    
    const selection = window.getSelection();
    if (selection.rangeCount === 0 || selection.toString().trim() === '') {
      showStatus('Please select text to hyperlink.', 'error');
      return;
    }
    
    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();
    
    // Create anchor
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.textContent = selectedText;
    
    // Replace selection
    range.deleteContents();
    range.insertNode(anchor);
    
    // Re-render
    convertContent();
    showStatus('Hyperlink added.');
  }
  
  // Copy code to clipboard with fallback
  function copyCode(element) {
    // Get the text without the copy hint
    const temp = element.cloneNode(true);
    const hint = temp.querySelector('.copy-hint');
    if (hint) {
      hint.remove();
    }
    const text = temp.textContent.trim();
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showStatus('Copied to clipboard.');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
    
    function fallbackCopy(text) {
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
  }
  
  // Clear editor
  function clearEditor() {
    if (editor.innerText.trim() !== '' &&
      !confirm('Are you sure you want to clear the editor?')) {
      return;
    }
    
    editor.innerHTML = '';
    setPlaceholder();
    outputSection.style.display = 'none';
    updateCharCounter();
    showStatus('Editor cleared.');
  }
  
  // Preview links
  function previewLinks() {
    const content = editor.innerHTML;
    const anchorRegex = /<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
    let previewHTML = '';
    let hasLinks = false;
    let match;
    
    while ((match = anchorRegex.exec(content)) !== null) {
      hasLinks = true;
      const url = decodeHTML(match[1]);
      const text = decodeHTML(match[2]);
      
      previewHTML += `
        <div style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 4px;">
          <h4>${text}</h4>
          <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>
        </div>
      `;
    }
    
    if (!hasLinks) {
      previewHTML = '<p>No links found in the editor.</p>';
    }
    
    previewContent.innerHTML = previewHTML;
    previewModal.style.display = 'flex';
  }
  
  // Download output
  function downloadOutput() {
    const format = currentFormat;
    let content = '';
    let filename = '';
    let mimeType = '';
    
    switch (format) {
      case 'html':
        content = htmlOutput.textContent;
        filename = 'links.html';
        mimeType = 'text/html';
        break;
      case 'markdown':
        content = markdownOutput.textContent;
        filename = 'links.md';
        mimeType = 'text/markdown';
        break;
      case 'bbcode':
        content = bbcodeOutput.textContent;
        filename = 'links.bbcode';
        mimeType = 'text/plain';
        break;
      case 'raw':
        content = rawOutput.textContent;
        filename = 'links.txt';
        mimeType = 'text/plain';
        break;
      case 'refmd':
        content = refmdOutput.textContent;
        filename = 'links-ref.md';
        mimeType = 'text/markdown';
        break;
      case 'json':
        content = jsonOutput.textContent;
        filename = 'links.json';
        mimeType = 'application/json';
        break;
      case 'slack':
        content = slackOutput.textContent;
        filename = 'links-slack.txt';
        mimeType = 'text/plain';
        break;
    }
    
    const blob = new Blob([content], {
      type: mimeType
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showStatus(`Downloaded ${filename}`);
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
  
  // Event handlers
  // Initialize placeholder on load
  initPlaceholder();
  updateHistoryUI();
  
  // Handle input in editor with debouncing
  editor.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setPlaceholder();
      convertContent();
      updateCharCounter();
    }, 300);
  });
  
  // Handle paste
  editor.addEventListener('paste', (e) => {
    e.preventDefault(); // Prevent default paste behavior
    
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedHTML = clipboardData.getData('text/html');
    const pastedText = clipboardData.getData('text/plain');
    
    if (pastedHTML) {
      // Insert HTML directly, preserving formatting
      document.execCommand('insertHTML', false, pastedHTML);
    } else if (pastedText) {
      // Fallback: insert plain text with line breaks
      // Replace newlines with <br> tags
      const htmlWithLineBreaks = pastedText.replace(/\n/g, '<br>');
      document.execCommand('insertHTML', false, htmlWithLineBreaks);
    }
  });
  
  // Make Hyperlink button
  btnMakeLink.addEventListener('click', () => {
    makeLink();
  });
  
  // Clear button
  btnClear.addEventListener('click', () => {
    clearEditor();
  });
  
  // Preview button
  btnPreview.addEventListener('click', () => {
    previewLinks();
  });
  
  // Download button
  btnDownload.addEventListener('click', () => {
    downloadOutput();
  });
  
  // Theme toggle
  themeToggle.addEventListener('click', () => {
    toggleDarkMode();
  });
  
  // History toggle - Add null check
  if (historyToggle) {
    historyToggle.addEventListener('click', (e) => {
      e.preventDefault();
      historyPanel.classList.add('open');
    });
  }
  
  // Close history
  closeHistory.addEventListener('click', () => {
    historyPanel.classList.remove('open');
  });
  
  // Close preview
  closePreview.addEventListener('click', () => {
    previewModal.style.display = 'none';
  });
  
  // Close preview when clicking outside
  previewModal.addEventListener('click', (e) => {
    if (e.target === previewModal) {
      previewModal.style.display = 'none';
    }
  });
  
  // Tab switching
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Update active tab button
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      
      // Update active tab content
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`${tabId}-panel`).classList.add('active');
      
      // Update current format
      currentFormat = tabId;
    });
  });
  
  // Copy output on click
  document.querySelectorAll('#output pre').forEach(pre => {
    pre.addEventListener('click', () => {
      copyCode(pre);
    });
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to make link
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      makeLink();
    }
    
    // Ctrl/Cmd + L to clear editor
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      clearEditor();
    }
    
    // Ctrl/Cmd + S to download
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      downloadOutput();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
      historyPanel.classList.remove('open');
      previewModal.style.display = 'none';
    }
  });
  
  // Add event listeners for history controls
  const clearAllHistoryBtn = document.getElementById('clear-all-history');
  if (clearAllHistoryBtn) {
    clearAllHistoryBtn.addEventListener('click', clearAllHistory);
  }
})();

// types/messages.ts
// Add these type definitions to your project

export interface CloudinaryUploadResponse {
  secure_url: string;
  original_filename: string;
  resource_type: 'image' | 'video' | 'raw' | 'auto';
  format: string;
  bytes: number;
  public_id: string;
  url: string;
  width?: number;
  height?: number;
  created_at?: string;
}

export interface FileMessage {
  type: 'file';
  file: CloudinaryUploadResponse;
  message?: string; // Optional text caption
}

export interface MessageContent {
  content: string; // Can be plain text or JSON stringified FileMessage
  recipientId: string;
  recipientType: string;
  messageType: 'private' | 'group';
  room?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  createdAt: string;
  updatedAt: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error' | 'received';
  room?: {
    id: string;
  };
}

// Helper function to check if a message is a file message
export function isFileMessage(content: string): boolean {
  try {
    const parsed = JSON.parse(content);
    return parsed.type === 'file' && parsed.file && parsed.file.secure_url;
  } catch {
    return false;
  }
}

// Helper function to parse file message
export function parseFileMessage(content: string): FileMessage | null {
  try {
    const parsed = JSON.parse(content);
    if (parsed.type === 'file' && parsed.file) {
      return parsed as FileMessage;
    }
    return null;
  } catch {
    return null;
  }
}

// Helper function to get file extension
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'FILE';
}

// Helper function to format file size
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// Helper function to check if file is an image
export function isImageFile(resourceType: string, format?: string): boolean {
  if (resourceType === 'image') return true;
  const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  return format ? imageFormats.includes(format.toLowerCase()) : false;
}

// Helper function to get file icon color based on type
export function getFileTypeColor(format: string): string {
  const colors: Record<string, string> = {
    pdf: '#E74C3C',
    doc: '#3498DB',
    docx: '#3498DB',
    xls: '#27AE60',
    xlsx: '#27AE60',
    ppt: '#E67E22',
    pptx: '#E67E22',
    zip: '#95A5A6',
    rar: '#95A5A6',
    txt: '#7F8C8D',
  };
  return colors[format?.toLowerCase()] || '#5B8469';
}
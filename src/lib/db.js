// A simple local database simulator using localStorage until Firebase is connected.

const DB_KEY = 'anni_admin_db';

function getDb() {
  const db = localStorage.getItem(DB_KEY);
  if (db) {
    return JSON.parse(db);
  }
  return { orders: [], inquiries: [] };
}

function saveDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function saveOrderToDb(order) {
  const db = getDb();
  db.orders.push({
    ...order,
    createdAt: new Date().toISOString(),
    id: Math.random().toString(36).substring(2, 9),
    adminNotes: '',
    status: 'new'
  });
  saveDb(db);
}

export function saveInquiryToDb(inquiry) {
  const db = getDb();
  db.inquiries.push({
    ...inquiry,
    createdAt: new Date().toISOString(),
    id: Math.random().toString(36).substring(2, 9),
    adminNotes: '',
    status: 'new'
  });
  saveDb(db);
}

export function getAllOrdersAndInquiries() {
  return getDb();
}

export function updateAdminNote(type, id, note) {
  const db = getDb();
  if (type === 'order') {
    const idx = db.orders.findIndex(o => o.id === id);
    if (idx > -1) db.orders[idx].adminNotes = note;
  } else {
    const idx = db.inquiries.findIndex(i => i.id === id);
    if (idx > -1) db.inquiries[idx].adminNotes = note;
  }
  saveDb(db);
}

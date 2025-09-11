const STORAGE_KEY = "watchlist";

export function loadWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveWatchlist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Add an item (object with {id, title, poster, ...})
// Returns {added: boolean, item}
export function addToWatchlist(list, item) {
  if (list.some((each) => each.id !== item.id)) {
    list.push(item);
    saveWatchlist(list);
    return { added: true, item };
  } else {
    return { added: false, item };
  }
}

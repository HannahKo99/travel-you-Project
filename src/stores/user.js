import { defineStore } from 'pinia'
import { ref } from 'vue'

// 為了確保圖片能被正確打包引用，建議使用 import 方式 (Vite/Webpack)
// 如果您的開發環境支援直接路徑引用，也可以直接寫字串
// 這裡示範最穩定的 import 寫法：
// 注意：請確保圖片檔案 src/assets/pic/PatStar.png 真實存在
import patStarAvatar from '@/assets/pic/PatStar.png'

export const useUserStore = defineStore('user', () => {
  // 1. 我的行程詳細數據 (保留原本的數據)
  const myItineraries = ref([
    {
      id: 1,
      title: '台北美食五日遊',
      startDate: '2024-12-20',
      endDate: '2024-12-24',
      status: 'upcoming',
      days: [
        {
          day: 1,
          date: '12/20',
          activities: [
            {
              id: 101,
              time: '09:00',
              icon: 'camera',
              title: '台北 101',
              desc: '參觀台北 101 觀景台，俯瞰城市美景，順便逛逛信義區百貨。',
            },
            {
              id: 102,
              time: '12:00',
              icon: 'coffee',
              title: '鼎泰豐午餐',
              desc: '享用世界聞名的小籠包，記得先抽號碼牌。',
            },
            {
              id: 103,
              time: '15:00',
              icon: 'map-pin',
              title: '象山步道',
              desc: '登上象山六巨石，拍攝台北 101 最好的角度。',
            },
            {
              id: 104,
              time: '19:00',
              icon: 'coffee',
              title: '饒河街夜市',
              desc: '必吃胡椒餅、藥燉排骨。',
            },
          ],
        },
        {
          day: 2,
          date: '12/21',
          activities: [
            {
              id: 201,
              time: '10:00',
              icon: 'map-pin',
              title: '故宮博物院',
              desc: '欣賞翠玉白菜與肉形石，深入了解中華文化歷史。',
            },
            {
              id: 202,
              time: '14:00',
              icon: 'coffee',
              title: '士林官邸',
              desc: '散步賞花，感受歷史氛圍。',
            },
            {
              id: 203,
              time: '18:00',
              icon: 'coffee',
              title: '士林夜市',
              desc: '體驗豪大大雞排與各種小吃。',
            },
          ],
        },
        {
          day: 3,
          date: '12/22',
          activities: [
            {
              id: 301,
              time: '09:00',
              icon: 'map-pin',
              title: '中正紀念堂',
              desc: '觀看衛兵交接儀式。',
            },
            {
              id: 302,
              time: '13:00',
              icon: 'camera',
              title: '華山文創園區',
              desc: '看展覽、喝咖啡，享受文青午後。',
            },
          ],
        },
        { day: 4, date: '12/23', activities: [] },
        { day: 5, date: '12/24', activities: [] },
      ],
      packingList: [
        {
          category: '證件與錢包',
          items: [
            { id: 'p1', name: '身分證/護照', checked: true },
            { id: 'p2', name: '悠遊卡', checked: true },
            { id: 'p3', name: '現金', checked: false },
          ],
        },
        {
          category: '衣物',
          items: [
            { id: 'c1', name: '換洗衣物 (5套)', checked: false },
            { id: 'c2', name: '薄外套', checked: true },
            { id: 'c3', name: '好走的鞋', checked: true },
          ],
        },
        {
          category: '電子產品',
          items: [
            { id: 'e1', name: '手機充電器', checked: true },
            { id: 'e2', name: '行動電源', checked: true },
            { id: 'e3', name: '相機', checked: false },
          ],
        },
      ],
    },
    {
      id: 2,
      title: '京都賞楓深度旅',
      startDate: '2025-11-15',
      endDate: '2025-11-20',
      status: 'planning',
      days: [],
      packingList: [],
    },
    {
      id: 3,
      title: '紐約跨年圓夢行',
      startDate: '2025-12-28',
      endDate: '2026-01-03',
      status: 'planning',
      days: [],
      packingList: [],
    },
    {
      id: 4,
      title: '泰國普吉島跳島遊',
      startDate: '2025-04-10',
      endDate: '2025-04-15',
      status: 'upcoming',
      days: [],
      packingList: [],
    },
    {
      id: 5,
      title: '瑞士阿爾卑斯鐵道行',
      startDate: '2025-06-01',
      endDate: '2025-06-08',
      status: 'planning',
      days: [],
      packingList: [],
    },
  ])

  // 2. 草稿夾數據
  const drafts = ref([
    {
      id: 101,
      type: 'discussion',
      typeLabel: '討論區',
      saveTime: '2024-12-05 14:30',
      title: '詢問日本超商問題',
      content: '下個月要去日本東京自由行，想在那邊買大研特享...',
    },
    {
      id: 102,
      type: 'traveler',
      typeLabel: '找旅伴',
      saveTime: '2024-12-04 10:12',
      title: '徵求春天北海道旅伴',
      content: '計畫明年4月去北海道賞櫻，想找志同道合的旅伴...',
    },
  ])

  // 新增行程
  const addItinerary = () => {
    const newId = Date.now()
    myItineraries.value.push({
      id: newId,
      title: '新行程草稿',
      startDate: '',
      endDate: '',
      status: 'draft',
      days: [
        { day: 1, date: 'Day 1', activities: [] },
        { day: 2, date: 'Day 2', activities: [] },
        { day: 3, date: 'Day 3', activities: [] },
      ],
      packingList: [
        { category: '未分類', items: [{ id: Date.now(), name: '記得帶護照', checked: false }] },
      ],
    })
  }

  // 刪除行程
  const deleteItinerary = (id) => {
    myItineraries.value = myItineraries.value.filter((i) => i.id !== id)
  }

  // 3. 使用者個人資料 (🟢 修改處)
  const userProfile = ref({
    name: '派大星', // 🟢 名字改為派大星
    id: '#2848',
    avatar: patStarAvatar, // 🟢 頭像引用引入的圖片變數
    // 如果 import 方式報錯，您可以嘗試註解上面那行並使用下面這行直接路徑：
    // avatar: '/src/assets/pic/PatStar.png',

    // 預設封面圖
    coverImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    postsCount: 0,
    savedCount: 0,
    likedCount: 0,
    bio: '海綿寶寶最好的朋友！',
  })

  //4.登入(出)判斷
  const isLoggedIn = ref(false)
  const login = () => {
    isLoggedIn.value = true
  }
  const logout = () => {
    isLoggedIn.value = false
  }

  // 更新封面圖
  const updateCoverImage = (url) => {
    userProfile.value.coverImage = url
  }

  // 更新頭像
  const updateAvatar = (url) => {
    userProfile.value.avatar = url
  }

  return {
    myItineraries,
    drafts,
    addItinerary,
    deleteItinerary,
    userProfile,
    updateCoverImage,
    updateAvatar,
    //登入(出)狀態
    isLoggedIn,
    login,
    logout,
  }
})

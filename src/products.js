export const products = [
  {
    id: 'daily-tote',
    name: '데일리 캔버스 토트백',
    category: 'Bag',
    price: 29000,
    badge: 'Best',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',
    description: '노트북과 책을 함께 넣기 좋은 넉넉한 사이즈의 캔버스 토트백입니다.',
  },
  {
    id: 'linen-shirt',
    name: '라이트 린넨 셔츠',
    category: 'Fashion',
    price: 42000,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
    description: '가볍고 통기성이 좋아 봄, 여름 데일리룩으로 입기 좋은 셔츠입니다.',
  },
  {
    id: 'ceramic-mug',
    name: '모닝 세라믹 머그',
    category: 'Living',
    price: 15000,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80',
    description: '따뜻한 커피와 차를 즐기기 좋은 부드러운 색감의 세라믹 머그입니다.',
  },
  {
    id: 'desk-lamp',
    name: '우드 데스크 램프',
    category: 'Interior',
    price: 56000,
    badge: 'Pick',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    description: '책상 위 분위기를 차분하게 잡아주는 우드 포인트 조명입니다.',
  },
];

export const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`;

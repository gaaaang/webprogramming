import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Home, Mail, Package, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react';
import { formatPrice, products } from './products.js';

function Layout({ cartCount }) {
  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/">
          <ShoppingBag size={24} />
          <span>Fresh Cart</span>
        </Link>
        <nav className="nav">
          <NavLink to="/">
            <Home size={18} />
            홈
          </NavLink>
          <NavLink to="/products">
            <Package size={18} />
            상품
          </NavLink>
          <NavLink to="/cart">
            <ShoppingCart size={18} />
            장바구니 {cartCount > 0 && <strong>{cartCount}</strong>}
          </NavLink>
          <NavLink to="/contact">
            <Mail size={18} />
            문의
          </NavLink>
        </nav>
      </header>
    </>
  );
}

function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">React Router Shopping Mall</p>
          <h1>쇼핑몰</h1>
          <p>
            202210998 정경섭
          </p>
          <div className="actions">
            <Link className="button primary" to="/products">상품 보러가기</Link>
            <Link className="button ghost" to="/contact">문의하기</Link>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
          alt="쇼핑몰 대표 상품 이미지"
        />
      </section>
      <section className="section">
        <h2>추천 상품</h2>
        <div className="product-grid">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductsPage() {
  return (
    <main className="section page">
      <div className="page-title">
        <p className="eyebrow">Products</p>
        <h1>전체 상품</h1>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="image-wrap">
          <img src={product.image} alt={product.name} />
          <span>{product.badge}</span>
        </div>
        <p>{product.category}</p>
        <h3>{product.name}</h3>
        <strong>{formatPrice(product.price)}</strong>
      </Link>
    </article>
  );
}

function ProductDetailPage({ onAddToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <main className="section page center">
        <h1>상품을 찾을 수 없습니다.</h1>
        <Link className="button primary" to="/products">목록으로 이동</Link>
      </main>
    );
  }

  const handleAdd = () => {
    onAddToCart(product);
    navigate('/cart');
  };

  return (
    <main className="detail page">
      <button className="icon-button" onClick={() => navigate('/products')} type="button" aria-label="상품 목록으로 이동">
        <ArrowLeft size={20} />
      </button>
      <img src={product.image} alt={product.name} />
      <section className="detail-info">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <strong>{formatPrice(product.price)}</strong>
        <p>{product.description}</p>
        <button className="button primary" onClick={handleAdd} type="button">
          장바구니 담기
        </button>
      </section>
    </main>
  );
}

function CartPage({ cartItems, onRemove }) {
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems],
  );

  return (
    <main className="section page">
      <div className="page-title">
        <p className="eyebrow">Cart</p>
        <h1>장바구니</h1>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty">
          <ShoppingCart size={40} />
          <p>담긴 상품이 없습니다.</p>
          <Link className="button primary" to="/products">상품 담으러 가기</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map((item, index) => (
              <article className="cart-item" key={`${item.id}-${index}`}>
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.category}</p>
                  <h3>{item.name}</h3>
                  <strong>{formatPrice(item.price)}</strong>
                </div>
                <button type="button" onClick={() => onRemove(index)} aria-label={`${item.name} 삭제`}>
                  <Trash2 size={18} />
                </button>
              </article>
            ))}
          </div>
          <aside className="summary">
            <span>총 결제 금액</span>
            <strong>{formatPrice(total)}</strong>
            <button className="button primary" type="button">주문하기</button>
          </aside>
        </div>
      )}
    </main>
  );
}

function ContactPage() {
  return (
    <main className="section page contact">
      <div className="page-title">
        <p className="eyebrow">Contact</p>
        <h1>고객 문의</h1>
      </div>
      <form>
        <label>
          이름
          <input type="text" placeholder="홍길동" />
        </label>
        <label>
          이메일
          <input type="email" placeholder="fresh@example.com" />
        </label>
        <label>
          문의 내용
          <textarea rows="5" placeholder="문의할 내용을 입력하세요." />
        </label>
        <button className="button primary" type="button">문의 보내기</button>
      </form>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="section page center">
      <h1>404</h1>
      <p>요청한 페이지가 없습니다.</p>
      <Link className="button primary" to="/">홈으로 이동</Link>
    </main>
  );
}

function ReportFooter() {
  return (
    <footer className="report-footer">
      <div>
        <p className="eyebrow">Production Report</p>
        <h2>제작보고서</h2>
        <p>
          React Router를 이용하여 홈, 상품 목록, 상품 상세, 장바구니, 고객 문의 페이지로
          이동하는 간단한 쇼핑몰을 제작했습니다.
        </p>
      </div>
      <dl>
        <div>
          <dt>사용 기술</dt>
          <dd>React, React Router DOM, Vite, CSS</dd>
        </div>
        <div>
          <dt>라우팅</dt>
          <dd>BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate</dd>
        </div>
        <div>
          <dt>구현 기능</dt>
          <dd>다중 페이지 이동, URL 매개변수 상품 상세, 장바구니 담기/삭제, 문의 폼</dd>
        </div>
        <div>
          <dt>제출 주소</dt>
          <dd>GitHub 주소와 Vercel 배포 주소는 배포 후 입력</dd>
        </div>
      </dl>
    </footer>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((items) => [...items, product]);
  };

  const removeFromCart = (index) => {
    setCartItems((items) => items.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <>
      <Layout cartCount={cartItems.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage onAddToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} onRemove={removeFromCart} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ReportFooter />
    </>
  );
}

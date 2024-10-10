# **📦 react-router-file-routing**

### **폴더/파일 기반 라우팅을 지원하는 React Router 확장 라이브러리**

`react-router-file-routing`은 **Next.js**의 App Router와 유사하게, 폴더/파일 구조에 기반한 라우팅을 지원하는 **React Router DOM** 기반의 확장 라이브러리입니다. 각 폴더에 `page.tsx` 파일을 두어 경로를 생성하고, 동적 라우트와 중첩 라우트도 손쉽게 관리할 수 있습니다.

---

### **🛠 설치 방법**

먼저, 라이브러리를 설치하기 전에 **반드시** `react-router-dom`과 `vite`가 설치되어 있어야 합니다.

```bash
npm install react-router-file-routing react-router-dom
npm install -D vite
```

---

### **🚀 사용 방법**

#### **1. 기본 폴더 구조**

경로에 맞게 **반드시** `src/pages/<경로명>/page.tsx` 형태의 파일 구조를 유지해야 합니다. 이 파일은 **default export**가 필수입니다.

```plaintext
src/
├── pages/
│   ├── index.tsx          // '/' 경로에 해당
│   ├── about/
│   │   └── page.tsx       // '/about' 경로에 해당
│   ├── blog/
│   │   ├── page.tsx       // '/blog' 경로에 해당
│   │   └── [postId]/
│   │       └── page.tsx   // '/blog/:postId' 동적 경로에 해당
│   └── dashboard/
│       ├── page.tsx       // '/dashboard' 경로에 해당
│       └── settings/
│           └── page.tsx   // '/dashboard/settings' 경로에 해당
```

#### **2. `FileRouter` 컴포넌트 사용**

`FileRouter` 컴포넌트는 프로젝트 내의 **폴더 기반 라우팅**을 쉽게 구현할 수 있도록 도와줍니다. 사용자는 `pages` 디렉토리 구조에 맞춰 파일을 작성하기만 하면 라우팅이 자동으로 처리됩니다.

```tsx
// src/App.tsx
import React from 'react';
import { FileRouter } from 'react-router-file-routing';

function App() {
  return <FileRouter />;
}

export default App;
```

#### **3. 동적 라우트**

폴더명에 **대괄호([ ])**를 사용하여 동적 라우트를 정의할 수 있습니다. 예를 들어, `[postId]`라는 폴더명은 `/blog/:postId` 경로로 해석됩니다.

```tsx
// src/pages/blog/[postId]/page.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPostPage() {
  const { postId } = useParams<{ postId: string }>();
  return <h1>Blog Post: {postId}</h1>;
}
```

다음은 개선된 **All Catch Router**에 대한 리드미입니다.

---

#### **All Catch Router**

폴더명에 **대괄호([ ])**와 **...**을 조합하여 **Catch-all 라우트**를 정의할 수 있습니다. 예를 들어, `/blog/[...slug]`라는 폴더명은 **React Router**에서 `/blog/*` 경로로 해석됩니다. 이 라우트는 여러 개의 경로 세그먼트를 포괄할 수 있으며, 다양한 깊이의 경로를 동일한 컴포넌트로 처리할 수 있습니다.

즉, `/blog/1`, `/blog/1/2`, `/blog/1/2/3` 등 모든 조합의 경로가 해당 `page.tsx`로 렌더링됩니다.

> **주의**: All Catch Router는 명시된 경로보다 우선순위가 낮습니다. 즉, 다른 명시적인 경로가 먼저 처리되고, 해당 경로가 없을 경우 All Catch Router가 처리됩니다.

```tsx
// src/pages/blog/[...slug]/page.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogCatchAllPage() {
  const params = useParams<{ '*': string }>(); // 와일드카드 매칭된 경로
  const slug = params['*'] ? params['*'].split('/') : []; // 슬래시로 분리된 경로 세그먼트 배열

  return (
    <div>
      <h1>Blog Catch-All Page</h1>
      <p>Current Slug: {JSON.stringify(slug)}</p>
    </div>
  );
}
```

##### 사용 예시

- `/blog/1`로 접근 시, `slug`는 `['1']`이 됩니다.
- `/blog/1/2`로 접근 시, `slug`는 `['1', '2']`가 됩니다.
- `/blog/1/2/3`로 접근 시, `slug`는 `['1', '2', '3']`이 됩니다.

**Catch-all 라우트**를 통해 여러 단계의 경로를 하나의 컴포넌트에서 쉽게 관리할 수 있으며, 다양한 세그먼트를 동적으로 처리할 수 있습니다.

#### **4. 레이아웃 지원 (예정)**

폴더 내에 `layout.tsx` 파일을 추가하여 해당 경로에 **레이아웃**을 적용할 수 있습니다. 레이아웃을 사용하면 중첩된 경로에 동일한 레이아웃을 적용할 수 있습니다.

```tsx
// src/pages/dashboard/layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}
```

---

### **📄 기여 방법**

이 프로젝트에 기여하고 싶으시다면, 다음 절차를 따라주세요:

1. 이 저장소를 **포크**합니다.
2. 새로운 **브랜치**를 생성합니다 (`git checkout -b feature/my-feature`).
3. 변경 사항을 **커밋**합니다 (`git commit -m 'Add some feature'`).
4. **푸시**합니다 (`git push origin feature/my-feature`).
5. **Pull Request**를 만듭니다.

---

### **📝 라이선스**

이 프로젝트는 [MIT 라이선스](LICENSE)에 따라 라이선스가 부여됩니다.

---

### **🔗 관련 링크**

- **React Router**: [https://reactrouter.com](https://reactrouter.com)
- **Next.js**: [https://nextjs.org](https://nextjs.org)

---

### **📧 문의**

궁금한 점이나 문제가 있다면 아래로 문의해 주세요

- **Email**: rkekqmf0926@gmail.com

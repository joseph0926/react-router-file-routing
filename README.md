# **📦 react-router-file-routing**

### **폴더/파일 기반 라우팅을 지원하는 React Router 확장 라이브러리**

`react-router-file-routing`은 **Next.js**의 App Router와 유사하게, 폴더/파일 구조에 기반한 라우팅을 지원하는 **React Router DOM** 기반의 확장 라이브러리입니다. 각 폴더에 `page.tsx` 파일을 두어 경로를 생성하고, 동적 라우트와 중첩 라우트도 손쉽게 관리할 수 있습니다.

---

### **🛠 설치 방법**

프로젝트에서 사용하기 위해서는 아래 명령어로 라이브러리를 설치할 수 있습니다.

```bash
npm install react-router-file-routing react-router-dom
npm install -D vite
```

**반드시 `react-router-dom`, `vite`이 설치되어있어야합니다.**

---

### **🚀 사용 방법**

#### **1. 기본 폴더 구조**

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

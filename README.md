[한국어 README](https://github.com/joseph0926/react-router-file-routing/blob/main/docs/README.md)

# **📦 react-router-file-routing**

### **A React Router Extension Supporting Folder/File-Based Routing**

`react-router-file-routing` is an extension of **React Router DOM** that supports folder/file-based routing, similar to the App Router in **Next.js**. It automatically generates routes based on folder structures with `page.tsx` files and allows easy management of dynamic and nested routes.

---

### **🛠 Installation**

Before installing this library, make sure that **react-router-dom** and **vite** are already installed.

```bash
npm install react-router-file-routing react-router-dom
npm install -D vite
```

---

### **🚀 Usage**

#### **1. Basic Folder Structure**

You must maintain the file structure in the format of `src/pages/<route-name>/page.tsx` to match the route. Each `page.tsx` file must have a **default export**.

```plaintext
src/
├── pages/
│   ├── page.tsx          // corresponds to the '/' route
│   ├── about/
│   │   └── page.tsx       // corresponds to the '/about' route
│   ├── blog/
│   │   ├── page.tsx       // corresponds to the '/blog' route
│   │   └── [postId]/
│   │       └── page.tsx   // corresponds to the '/blog/:postId' dynamic route
│   └── dashboard/
│       ├── page.tsx       // corresponds to the '/dashboard' route
│       └── settings/
│           └── page.tsx   // corresponds to the '/dashboard/settings' route
```

#### **2. Using the `FileRouter` Component**

The `FileRouter` component helps implement **folder-based routing** easily. By simply writing files according to the `pages` directory structure, routing will be handled automatically.

```tsx
// src/App.tsx
import React from 'react';
import { FileRouter } from 'react-router-file-routing';

function App() {
  return <FileRouter />;
}

export default App;
```

#### **3. Dynamic Routes**

Use **brackets ([ ])** in folder names to define dynamic routes. For example, a folder named `[postId]` will be interpreted as the route `/blog/:postId`.

```tsx
// src/pages/blog/[postId]/page.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPostPage() {
  const { postId } = useParams<{ postId: string }>();
  return <h1>Blog Post: {postId}</h1>;
}
```

---

#### **All Catch Router**

You can define a **Catch-all route** by combining brackets ([ ]) and **...** in folder names. For example, the folder `/blog/[...slug]` will be interpreted as `/blog/*` in **React Router**, and it will match multiple path segments.

Thus, paths like `/blog/1`, `/blog/1/2`, `/blog/1/2/3`, etc., will all render the same `page.tsx`.

> **Note**: All Catch Routers have a lower priority than explicitly defined routes. This means that specific routes will be handled first, and the Catch-all route will handle any unmatched paths.

```tsx
// src/pages/blog/[...slug]/page.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogCatchAllPage() {
  const params = useParams<{ '*': string }>(); // wildcard matched route
  const slug = params['*'] ? params['*'].split('/') : []; // array of path segments

  return (
    <div>
      <h1>Blog Catch-All Page</h1>
      <p>Current Slug: {JSON.stringify(slug)}</p>
    </div>
  );
}
```

##### Usage Examples

- Accessing `/blog/1` will result in `slug = ['1']`.
- Accessing `/blog/1/2` will result in `slug = ['1', '2']`.
- Accessing `/blog/1/2/3` will result in `slug = ['1', '2', '3']`.

With **Catch-all routes**, you can manage multiple levels of paths with a single component and dynamically handle different segments.

#### **4. Layout Support**

You can add a `layout.tsx` file inside a folder to apply a **layout** to the corresponding route. Layouts allow you to apply the same structure to nested routes.

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

#### **5. Group Routing Support**

You can define a group route (or pathless route) using `(folder-name)` format.

- Ex.1
  - Folder: /pages/(root)/page.tsx, layout.tsx
  - Path: "/"
- Ex.2
  - Folder: /pages/home/(auth)/layout.tsx,page.tsx
  - Path: "/home"

#### **6. Error Support**

You can add an `error.tsx` file inside the folder to perform processing for **errors** in that path.<br/>
For more details, see [errorElement in React Router](https://reactrouter.com/en/main/route/error-element)

```tsx
// src/pages/error.tsx
import { useRouteError } from 'react-router-dom';

export default function HomeError() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className={styles.error}>
      <h1>Home Page Error</h1>
      <p>test</p>
    </div>
  );
}
```

#### **7. Loading Support**

You can add a `loading.tsx` file inside the folder to handle **loading** to that path.<br/>
For more information, see [Suspense fallback in React](https://react.dev/reference/react/Suspense#suspense)

```tsx
// src/pages/loading.tsx
export default function HomeLoading() {
  return (
    <div className={styles.wrapper}>
      <h1>Home Page Title</h1>
      <div className={styles.spinner} />
    </div>
  );
}
```

#### **7. Loader Support**

You can add a `loader.ts` file inside the folder to handle **loader** to that path.<br/>
For more information, see [Loader in React Router](https://reactrouter.com/en/main/route/loader)

```tsx
// src/pages/loader.ts
export default async function rootLoader() {
  const res = await fetch('https://swapi.dev/api/people');

  return await res.json();
}

// src/pages/layout.tsx
const data = useLoaderData();
```

---

### **📄 How to Contribute**

If you want to contribute to this project, follow these steps:

1. **Fork** the repository.
2. Create a new **branch** (`git checkout -b feature/my-feature`).
3. **Commit** your changes (`git commit -m 'Add some feature'`).
4. **Push** to the branch (`git push origin feature/my-feature`).
5. Create a **Pull Request**.

---

### **📝 License**

This project is licensed under the [MIT License](LICENSE).

---

### **🔗 Related Links**

- **React Router**: [https://reactrouter.com](https://reactrouter.com)
- **Next.js**: [https://nextjs.org](https://nextjs.org)

---

### **📧 Contact**

If you have any questions or issues, feel free to contact me at:

- **Email**: rkekqmf0926@gmail.com

```

```

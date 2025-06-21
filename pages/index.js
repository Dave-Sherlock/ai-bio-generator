 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/pages/index.js b/pages/index.js
index 84374e1092ae45ed942111e88ce458a532cdc65b..bdccffe1bb09b802edb768a46f3f43657dc98124 100644
--- a/pages/index.js
+++ b/pages/index.js
@@ -1,44 +1,52 @@
 import { useState } from "react";
 
 export default function Home() {
   const [name, setName] = useState("");
   const [role, setRole] = useState("");
   const [bio, setBio] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
 
   async function generateBio() {
+    const trimmedName = name.trim();
+    const trimmedRole = role.trim();
+
+    if (!trimmedName || !trimmedRole) {
+      setError("Name and role are required.");
+      return;
+    }
+
     setLoading(true);
     setError("");
     setBio("");
 
     try {
       const response = await fetch("/api/generate", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
-        body: JSON.stringify({ name, role }),
+        body: JSON.stringify({ name: trimmedName, role: trimmedRole }),
       });
 
       const data = await response.json();
       if (response.ok) {
         setBio(data.bio);
       } else {
         setError(data.error || "Something went wrong");
       }
     } catch (err) {
       setError("Network error: " + err.message);
     }
 
     setLoading(false);
   }
 
   return (
     <main style={{ padding: "2rem", fontFamily: "Arial" }}>
       <h1>AI Bio Generator</h1>
 
       <input
         type="text"
         placeholder="Your name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         style={{ display: "block", marginBottom: "1rem", width: "100%" }}
 
EOF
)

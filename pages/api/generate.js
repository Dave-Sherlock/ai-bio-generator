 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/pages/api/generate.js b/pages/api/generate.js
index ded5764c1fb8bd1e4cc3c22aea57973b6e08fabc..d419a887b40338516b92086fde1d9c1181dd4926 100644
--- a/pages/api/generate.js
+++ b/pages/api/generate.js
@@ -1,35 +1,41 @@
 import OpenAI from "openai";
 
 const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
 });
 
 export default async function handler(req, res) {
   if (req.method !== "POST") {
     return res.status(405).json({ error: "Method Not Allowed" });
   }
 
-  const { name, role } = req.body;
+  if (!process.env.OPENAI_API_KEY) {
+    console.error("OPENAI_API_KEY not configured");
+    return res.status(500).json({ error: "Server configuration error." });
+  }
+
+  const name = (req.body.name || "").trim();
+  const role = (req.body.role || "").trim();
 
   if (!name || !role) {
     return res.status(400).json({ error: "Name and role are required." });
   }
 
   try {
     const response = await openai.chat.completions.create({
       model: "gpt-4o",
       messages: [
         {
           role: "user",
           content: `Write a short professional bio for ${name}, who works as a ${role}. Make it polished, concise, and unique.`,
         },
       ],
     });
 
     const bio = response.choices[0].message.content;
     res.status(200).json({ bio });
   } catch (error) {
     console.error("OpenAI error:", error);
     res.status(500).json({ error: "Failed to generate bio" });
   }
 }
 
EOF
)

use client";
import {useState} from "react";
export default function ContentAdmin(){
 const [type,setType]=useState("lesson"); const [data,setData]=useState<any>({}); const [msg,setMsg]=useState("");
 async function save(){
  const r=await fetch("/api/content/admin",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...data,type})});
  const x=await r.json(); setMsg(r.ok?`تم الحفظ بنجاح — ${x.id}`:(x.error||"تعذر الحفظ"));
 }
 return <main dir="rtl" className="p-6 max-w-4xl mx-auto"><h1 className="text-3xl font-black">إدارة المحتوى</h1><p className="text-slate-500 mb-6">إضافة وحدة أو درس أو مفهوم إلى قاعدة البيانات.</p>
 <section className="bg-white rounded-2xl shadow p-6 grid gap-3">
 <select className="border rounded-xl p-3" value={type} onChange={e=>setType(e.target.value)}><option value="lesson">درس</option><option value="unit">وحدة</option><option value="concept">مفهوم</option></select>
 {type==="unit"&&<><input className="border rounded-xl p-3" placeholder="Grade ID" onChange={e=>setData({...data,gradeId:e.target.value})}/><input className="border rounded-xl p-3" placeholder="Subject ID" onChange={e=>setData({...data,subjectId:e.target.value})}/><input className="border rounded-xl p-3" placeholder="اسم الوحدة" onChange={e=>setData({...data,name:e.target.value})}/></>}
 {type==="lesson"&&<><input className="border rounded-xl p-3" placeholder="Unit ID" onChange={e=>setData({...data,unitId:e.target.value})}/><input className="border rounded-xl p-3" placeholder="عنوان الدرس" onChange={e=>setData({...data,title:e.target.value})}/><textarea className="border rounded-xl p-3 min-h-32" placeholder="محتوى الدرس المصرح باستخدامه" onChange={e=>setData({...data,content:e.target.value})}/><textarea className="border rounded-xl p-3" placeholder="ملخص الدرس" onChange={e=>setData({...data,summary:e.target.value})}/></>}
 {type==="concept"&&<><input className="border rounded-xl p-3" placeholder="Lesson ID" onChange={e=>setData({...data,lessonId:e.target.value})}/><input className="border rounded-xl p-3" placeholder="اسم المفهوم" onChange={e=>setData({...data,name:e.target.value})}/><textarea className="border rounded-xl p-3" placeholder="وصف المفهوم" onChange={e=>setData({...data,description:e.target.value})}/></>}
 <button onClick={save} className="bg-slate-900 text-white rounded-xl p-3 font-bold">حفظ</button>{msg&&<p>{msg}</p>}</section></main>
}
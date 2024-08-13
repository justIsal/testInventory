"use client";
import OpenApi from "@/app/api/openapi.json";
import {useEffect, useState} from "react";

const OpenApiPage = () => {
 const [currentSection, setCurrentSection] = useState("section0-0");

 useEffect(() => {
  const sectionElements = document.querySelectorAll("[id^='section']");
  const handleScroll = () => {
   sectionElements.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom >= 0) {
     setCurrentSection(section.id);
    }
   });
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
   window.removeEventListener("scroll", handleScroll);
  };
 }, []);

 const handleNavigation = (sectionId) => {
  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) {
   setCurrentSection(sectionId);
   sectionElement.scrollIntoView();
  }
 };

 const handleDownload = () => {
  const blob = new Blob([JSON.stringify(OpenApi, null, 2)], {
   type: "application/json",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "openapi.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
 };

 const colorbyMethod = (method) => {
  const color =
   method === "get"
    ? "text-blue-500"
    : method === "post"
    ? "text-green-500"
    : method === "put"
    ? "text-orange-500"
    : method === "delete"
    ? "text-red-500"
    : "text-gray-500";

  return color;
 };

 const getExampleType = (type, array) => {
  if (type === "number") {
   return "1";
  } else if (type === "string") {
   return '" "';
  } else if (type === "boolean") {
   return "true";
  } else if (type === "object") {
   return "{}";
  } else if (type === "array") {
   if (array === "string") {
    return '["string"]';
   }
   if (array === "number") {
    return "[0]";
   }
   if (array === "boolean") {
    return "[true]";
   }
   if (array === "object") {
    return "[{}]";
   }
   return "[]";
  }
 };

 const [collapse, setCollapse] = useState(false);

 return (
  <div className="flex relative bg-black text-white">
   <div className="fixed top-0 m-4 p-3 space-y-2 w-[calc(100vw-2rem)] md:w-72 bg-gray-900 text-gray-50 rounded-lg max-h-[calc(100dvh-2rem)] ">
    <div className="flex items-center justify-between h-[calc(10dvh)] min-h-12">
     <button
      className="p-2 w-full"
      onClick={() => handleNavigation(`section`)}>
      <h2 className="text-lg font-semibold">
       {OpenApi.info.title} v{OpenApi.info.version}
      </h2>
      {OpenApi.info.description && (
       <p className="text-xs text-gray-300 ">{OpenApi.info.description}</p>
      )}
     </button>
     <button
      className="p-2 md:hidden bg-gray-800 rounded-md"
      onClick={() => setCollapse(!collapse)}>
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="w-6 h-6"
       fill="white"
       viewBox="0 0 24 24"
       stroke="currentColor">
       {collapse ? (
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M6 18L18 6M6 6l12 12"
        />
       ) : (
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M4 6h16M4 12h16M4 18h16"
        />
       )}
      </svg>
     </button>
    </div>
    <div
     className={`divide-y divide-gray-300 md:block max-h-[calc(90dvh-4rem)] overflow-y-auto ${
      collapse ? "" : "hidden"
     }`}
     style={{
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.1)",
     }}>
     <ul className="pt-2 pb-4 space-y-1 text-sm ">
      {Object.entries(OpenApi.paths).map(([path, methods], index) => {
       return Object.entries(methods).map(([method, value], index2) => {
        return (
         <li
          key={index}
          className={`flex items-center px-2 space-x-3 rounded-md ${
           currentSection === `section${index}-${index2}` ? "bg-gray-600" : ""
          }`}>
          <button
           rel="noopener noreferrer"
           onClick={() => handleNavigation(`section${index}-${index2}`)}
           className="flex items-center justify-between w-full p-2 space-x-3 rounded-md">
           <span>{path}</span>
           <span
            className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${colorbyMethod(
             method
            )}`}>
            {method.toUpperCase()}
           </span>
          </button>
         </li>
        );
       });
      })}
     </ul>
    </div>
   </div>
   <div className="flex w-full flex-col gap-10 mt-12 md:mt-0 md:ml-80">
    <div
     id={`section`}
     className="m-8 pt-10">
     <p className="text-sm font-bold text-gray-500">
      API v{OpenApi.info.version} OAS {OpenApi.openapi}
     </p>
     <h1 className="text-2xl font-bold">Documentation {OpenApi.info.title}</h1>
     <button
      className="text-blue-500 text-sm"
      onClick={handleDownload}>
      Download OpenAPI Spec
     </button>
     {OpenApi.info.description && (
      <p className="mt-4">{OpenApi.info.description}</p>
     )}

     {OpenApi.info.contact && (
      <p className="mt-2 text-sm">
       By{" "}
       <a
        className={OpenApi.info.contact.url && "text-blue-500"}
        href={OpenApi.info.contact.url || null}>
        {OpenApi.info.contact.name}
       </a>
      </p>
     )}
     <p className="text-xs mt-10">Base URL: {OpenApi.servers[0].url}</p>
    </div>
    {Object.entries(OpenApi.paths).map(([path, methods], index) => {
     return Object.entries(methods).map(([method, value], index2) => {
      return (
       <div
        id={`section${index}-${index2}`}
        key={`section${index}-${index2}`}
        className="m-8 border-t border-gray-600 pt-10">
        <div className="flex justify-between gap-4 flex-col md:flex-row">
         <div>
          <h3>{method.toUpperCase()}</h3>
          <p className="text-sm font-bold text-gray-500">
           {OpenApi.servers[0].url}
          </p>
          <h2 className="text-xl">{path}</h2>
         </div>
         {value.summary && <p className="text-lg">{value.summary}</p>}
        </div>
        {value.parameters && (
         <div className="mt-4">
          <p className="text-sm font-bold text-gray-500">Path Parameters</p>
          <div className="flex justify-between md:gap-8 mt-4 gap-4 flex-col md:flex-row">
           <div className="w-full">
            <p>Parameters</p>
            <ol className="w-full mt-2 border-b border-gray-800">
             {value.parameters.map((param, index) => {
              return (
               <li
                key={param.name}
                className="text-sm border-t border-gray-800 py-2">
                <p>
                 {param.name}{" "}
                 {param.required && (
                  <span className="text-red-500">required</span>
                 )}{" "}
                 <span className="text-gray-500">{param.schema.type}</span>
                </p>
                <p className="text-gray-600">{param.description}</p>
               </li>
              );
             })}
            </ol>
           </div>
          </div>
         </div>
        )}
        {value.requestBody && (
         <div className="flex justify-between md:gap-8 mt-4 gap-4 flex-col md:flex-row">
          <div className="w-full">
           <p className="text-sm font-bold text-gray-500">Request Body</p>
           {value.requestBody.description && (
            <p className="text-sm">{value.requestBody.description}</p>
           )}
           {value.requestBody.content &&
            value.requestBody.content["application/json"] && (
             <div className="mt-4">
              <p>
               Body
               {value.requestBody.required && (
                <span className="text-red-500">*</span>
               )}{" "}
               <span className="text-sm font-bold text-gray-500">
                application/json
               </span>
              </p>

              <ol className="w-full mt-2 border-b border-gray-800">
               {Object.entries(
                value.requestBody.content["application/json"].schema.properties
               ).map(([key, value2]) => {
                return (
                 <li
                  key={key}
                  className="text-sm border-t border-gray-800 py-2">
                  <p>
                   {key}{" "}
                   {value.requestBody.content[
                    "application/json"
                   ].schema?.required?.includes(key) ? (
                    <span className="text-red-500">required</span>
                   ) : (
                    <span className="text-blue-500">optional</span>
                   )}{" "}
                   <span className="text-gray-500">{value2.type}</span>
                  </p>
                  {value2.description && (
                   <p className="text-gray-600">{value2.description}</p>
                  )}
                 </li>
                );
               })}
              </ol>
             </div>
            )}
          </div>
          <div className="bg-gray-900 rounded-lg w-full border border-gray-700">
           <p className="text-sm font-bold text-gray-400 border-b border-gray-700 p-2">
            <span className={colorbyMethod(method)}>
             {method.toUpperCase()}{" "}
            </span>
            {path}
           </p>
           <div className="p-2">
            <div className="text-sm text-gray-400">{"{"}</div>
            {Object.entries(
             value.requestBody.content["application/json"].schema.properties
            ).map(([key, value2], index) => {
             return (
              <div
               key={key}
               className="text-sm text-gray-400 ml-4">
               &#34;{key}&#34; :{" "}
               {getExampleType(
                value2.type,
                value2.type === "array" ? value2.items.type : null
               )}
               {Object.entries(
                value.requestBody.content["application/json"].schema.properties
               ).length -
                1 ===
               index
                ? null
                : ","}
              </div>
             );
            })}
            <div className="text-sm text-gray-400">{"}"}</div>
           </div>
          </div>
         </div>
        )}
        <p className="mt-10 py-2 border-b border-gray-800 mb-2">Responses</p>
        {Object.entries(value.responses).map(([code, {description}], index) => {
         return (
          <p key={index}>
           {code} - {description}
          </p>
         );
        })}
       </div>
      );
     });
    })}
   </div>
  </div>
 );
};

export default OpenApiPage;

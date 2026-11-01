// 所有角色設定都可以在這裡修改，不必更動 3D 核心程式。
// stage 代表任務順序；顏色採用 #RRGGBB。
export const AGENTS = [
  {id:"bigfoot", name:"大腳怪", english:"BIGFOOT", model:"Gemini", job:"職缺探索員", color:"#b77b51", emoji:"🐾", description:"深入網路森林，尋找適合 Jessy 的工作機會。", task:"正在探索職缺來源（模擬）"},
  {id:"yeti", name:"雪怪", english:"YETI", model:"ChatGPT", job:"職缺審核員", color:"#c5e7f2", emoji:"❄️", description:"檢查遠端條件、薪資、工時和技能門檻。", task:"正在檢查求職條件（模擬）"},
  {id:"swamp", name:"沼澤怪物", english:"SWAMP CREATURE", model:"Claude", job:"履歷分析師", color:"#68b89c", emoji:"🌿", description:"研究履歷與職缺之間的技能差距。", task:"正在分析履歷差距（模擬）"},
  {id:"vampire", name:"吸血鬼", english:"VAMPIRE", model:"任務秘書", job:"工作室秘書", color:"#a18bd2", emoji:"🦇", description:"管理工作流程、整理成果與待辦事項。", task:"正在彙整模擬任務結果"}
];
export const OFFICE_TITLE = "Jessy's Monster AI Studio";

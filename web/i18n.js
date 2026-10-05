// Aniimax interface translations (English / Thai).
//
// app.js builds most of the page as English text, so rather than threading a translate call
// through every template, this script watches the page and swaps whole English strings for
// their Thai versions as they appear: text nodes and a few attributes (title, placeholder,
// aria-label, data-tooltip, data-label, data-tip) are looked up in `TH` exactly, then in
// `PATTERNS` for strings with numbers or names in them. Game names (facilities, items,
// abilities, currencies) come from i18n-names-th.js and are swapped in wherever they appear,
// including inside the translated sentences. Anything not covered stays in English.
//
// The Help and Math modals are long-form and swap their whole body for `TH_HTML` instead.
// Switching back to English restores every original string, so nothing has to re-render.
(function () {
    'use strict';

    const STORAGE_KEY = 'aniimax-lang';

    function readSaved() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function save(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch (e) {
            // Private windows can refuse storage; the choice then lasts for this page load.
        }
    }

    const saved = readSaved();
    let lang = saved === 'th' || saved === 'en'
        ? saved
        : ((navigator.language || '').toLowerCase().startsWith('th') ? 'th' : 'en');

    // Exact strings, matched after collapsing whitespace.
    const TH = {
        // Page and header
        'Aniimax - Aniimo Production Optimizer': 'Aniimax - เครื่องมือวางแผนการผลิต Aniimo',
        'facilities': 'สิ่งอำนวยการผลิต',
        'math': 'คณิตศาสตร์',
        'help': 'วิธีใช้',
        'light': 'สว่าง',
        'dark': 'มืด',
        'github': 'GitHub',
        'aniimo homeland production optimizer': 'เครื่องมือวางแผนการผลิตใน Aniimo Homeland',
        "A few recipes, facility levels and counts haven't been confirmed in game yet; they're marked where they're used.":
            'สูตร ระดับ และจำนวนสิ่งอำนวยการผลิตบางรายการยังไม่ได้ยืนยันในเกม ซึ่งจะมีเครื่องหมายกำกับไว้ตรงที่ใช้',

        // Setup card
        'Your Homeland': 'Homeland ของคุณ',
        'Share setup': 'แชร์การตั้งค่า',
        'Clear saved values': 'ล้างค่าที่บันทึกไว้',
        'Your inputs are saved in this browser automatically.': 'ค่าที่กรอกจะถูกบันทึกในเบราว์เซอร์นี้โดยอัตโนมัติ',
        'Shareable link': 'ลิงก์สำหรับแชร์',
        'Input mode': 'โหมดการกรอก',
        'Simple': 'แบบง่าย',
        'Advanced': 'แบบละเอียด',
        'RV level': 'ระดับ RV',
        "Assumes you've built and upgraded everything your RV level allows.":
            'ถือว่าคุณสร้างและอัปเกรดทุกอย่างที่ระดับ RV ของคุณอนุญาตไว้แล้ว',
        'Facilities and modules': 'สิ่งอำนวยการผลิตและโมดูล',
        'Facilities': 'สิ่งอำนวยการผลิต',
        'Set the count and level for each facility you have.': 'กำหนดจำนวนและระดับของสิ่งอำนวยการผลิตแต่ละอย่างที่คุณมี',
        'Fill from RV level': 'เติมค่าจากระดับ RV',
        'Fill': 'เติม',
        'Replaces every count and level below with what that RV level allows.':
            'แทนที่จำนวนและระดับทั้งหมดด้านล่างด้วยค่าที่ระดับ RV นั้นอนุญาต',
        'Item Upgrade Modules': 'โมดูลอัปเกรดไอเท็ม',
        'Set the level for each upgrade module you have unlocked (0 = not unlocked).':
            'กำหนดระดับของโมดูลอัปเกรดแต่ละตัวที่ปลดล็อกแล้ว (0 = ยังไม่ปลดล็อก)',
        'Level': 'ระดับ',
        'Count': 'จำนวน',
        'Strategy': 'กลยุทธ์',
        'Level up': 'เลื่อนระดับ',
        'Priorities': 'ลำดับความสำคัญ',
        "Switch on what you want and drag to rank it. The plan makes as much of the first as it can, then as much of the next as that allows, and so on. Whatever's left always goes to Home Coins.":
            'เปิดสิ่งที่ต้องการแล้วลากเพื่อจัดลำดับ แผนจะผลิตอันดับแรกให้ได้มากที่สุด แล้วจึงผลิตอันดับถัดไปให้มากที่สุดเท่าที่ยังทำได้ ไปเรื่อย ๆ ส่วนที่เหลือจะนำไปทำ Home Coins เสมอ',
        'Gets everything your next RV level costs as soon as possible, then earns as many Home Coins as that leaves room for.':
            'หาของทุกอย่างที่ต้องใช้เลื่อน RV ระดับถัดไปให้เร็วที่สุด แล้วหา Home Coins ให้ได้มากที่สุดเท่าที่เหลือกำลัง',
        'Level up to RV': 'เลื่อนระดับไปถึง RV',
        'What you already have': 'ของที่คุณมีอยู่แล้ว',
        'Counts toward the level-up. Wood Blocks, Mineral Sand and lower tiers get processed up.':
            'นับรวมในการเลื่อนระดับ Wood Blocks, Mineral Sand และขั้นที่ต่ำกว่าจะถูกแปรรูปขึ้นไป',
        'Moonray Wheat you can spend on seeds a day': 'Moonray Wheat ที่ใช้ซื้อเมล็ดได้ต่อวัน',
        'No limit': 'ไม่จำกัด',
        'A seasonal event with its own currency, Moonray Wheat, which buys the season\'s seeds. Keeping enough wheat on hand is up to you; plans show how much their seeds use. Season items also earn Harvest Moon Points, which you can rank under Priorities.':
            'กิจกรรมตามฤดูกาลที่มีสกุลเงินของตัวเองคือ Moonray Wheat ใช้ซื้อเมล็ดพันธุ์ประจำฤดูกาล คุณต้องเตรียม wheat ให้พอเอง แผนจะแสดงว่าเมล็ดใช้ไปเท่าไร ไอเท็มประจำฤดูกาลยังให้ Harvest Moon Points ซึ่งจัดลำดับได้ในหัวข้อลำดับความสำคัญ',
        'Recipes': 'สูตร',
        'Special recipes': 'สูตรพิเศษ',
        'These take a rare currency to unlock. Plans only use the ones you tick.':
            'สูตรเหล่านี้ต้องใช้สกุลเงินหายากในการปลดล็อก แผนจะใช้เฉพาะสูตรที่คุณติ๊กเลือก',
        'Recipes to skip': 'สูตรที่ไม่ต้องใช้',
        "Plans won't use these, e.g. recipes behind unlocks you don't have yet. You can also skip one straight from a plan with its ✕.":
            'แผนจะไม่ใช้สูตรเหล่านี้ เช่น สูตรที่คุณยังไม่ได้ปลดล็อก คุณยังข้ามสูตรได้จากในแผนโดยกดปุ่ม ✕',
        'Search recipes': 'ค้นหาสูตร',
        'Recipe to skip': 'สูตรที่จะข้าม',
        'Skip': 'ข้าม',
        'Find the best plan': 'หาแผนที่ดีที่สุด',
        'Solving...': 'กำลังคำนวณ...',

        // Results
        'Aniimo Team': 'ทีม Aniimo',
        'Aniimo setup': 'การตั้งค่า Aniimo',
        'Best': 'ดีที่สุด',
        'Minimum': 'ขั้นต่ำ',
        'My Aniimo': 'Aniimo ของฉัน',
        "The best Aniimo you have, with each facility's personality": 'Aniimo ที่ดีที่สุดที่คุณมี พร้อมนิสัยที่ตรงกับแต่ละสิ่งอำนวยการผลิต',
        'The lowest ability level each recipe accepts: the least you can get by with': 'ระดับความสามารถต่ำสุดที่แต่ละสูตรรับได้: ขั้นต่ำที่พอใช้งานได้',
        'Plan with the Aniimo you actually have': 'วางแผนด้วย Aniimo ที่คุณมีจริง',
        'Aniimo needed per ability': 'จำนวน Aniimo ที่ต้องใช้ต่อความสามารถ',
        'Still working this setup out...': 'กำลังคำนวณการตั้งค่านี้...',
        'How the team is worked out': 'วิธีคำนวณทีม',
        'Level-Up': 'เลื่อนระดับ',
        'Your Rate': 'อัตราของคุณ',
        'Your Rates': 'อัตราของคุณ',
        'Rate unit': 'หน่วยอัตรา',
        'per second': 'ต่อวินาที',
        'per minute': 'ต่อนาที',
        'per hour': 'ต่อชั่วโมง',
        'per day': 'ต่อวัน',
        'Opportunities': 'โอกาสในการพัฒนา',
        'Seeds to Plant': 'เมล็ดที่ต้องปลูก',
        'Profit by Product': 'กำไรแยกตามสินค้า',
        'Net of seed costs.': 'หักค่าเมล็ดแล้ว',
        'What Each Facility Should Do': 'สิ่งอำนวยการผลิตแต่ละอย่างควรทำอะไร',
        'How to read this': 'วิธีอ่านตารางนี้',
        'Each row is one product; a facility split between several products gets a row for each. Crops that need a growing environment are grouped by the Heat Furnace, Cooling Unit or Sunlamp setting that covers them, with its layout. Everything else is grouped like the facility list.':
            'แต่ละแถวคือสินค้าหนึ่งอย่าง สิ่งอำนวยการผลิตที่แบ่งไปทำหลายสินค้าจะมีแถวสำหรับแต่ละสินค้า พืชที่ต้องการสภาพแวดล้อมการเติบโตจะจัดกลุ่มตาม Heat Furnace, Cooling Unit หรือ Sunlamp ที่ครอบคลุม พร้อมผังการวาง ส่วนที่เหลือจัดกลุ่มเหมือนรายการสิ่งอำนวยการผลิต',
        'In the Aniimo column, each circle is an ability in its game color with the Aniimo level inside; a ring means the plan counts on the facility\'s personality bonus. Hover a circle for details.':
            'ในคอลัมน์ Aniimo วงกลมแต่ละวงคือความสามารถหนึ่งอย่างตามสีในเกม โดยมีระดับ Aniimo อยู่ข้างใน ถ้ามีวงแหวนรอบ แปลว่าแผนนับโบนัสนิสัยของสิ่งอำนวยการผลิตนั้นด้วย ชี้ที่วงกลมเพื่อดูรายละเอียด',
        'Homeland Layout': 'ผัง Homeland',
        "How it's laid out": 'วิธีจัดผัง',
        'Show the whole homeland': 'แสดง homeland ทั้งหมด',
        'Simulate': 'จำลอง',
        'Replay': 'เล่นซ้ำ',
        'Set a Goal': 'ตั้งเป้าหมาย',
        'Updates instantly from the plan above.': 'อัปเดตทันทีจากแผนด้านบน',
        'Goal': 'เป้าหมาย',
        'Target Home Coins': 'Home Coins เป้าหมาย',
        'Current Home Coins': 'Home Coins ปัจจุบัน',
        'Total Time': 'เวลาทั้งหมด',
        'Home Coins Produced': 'Home Coins ที่ผลิตได้',
        'Product Breakdown': 'รายละเอียดสินค้า',
        'Item': 'ไอเท็ม',
        'Facility': 'สิ่งอำนวยการผลิต',
        'Amount': 'จำนวน',
        'Profit': 'กำไร',
        'Worth': 'มูลค่า',
        'Seeds Needed': 'เมล็ดที่ต้องใช้',
        'Crop': 'พืช',
        'Plots': 'แปลง',
        'Plantings/Plot': 'จำนวนครั้งที่ปลูก/แปลง',
        'Total Seeds': 'เมล็ดทั้งหมด',

        // Footer
        'Unofficial fan-made tool. Not affiliated with or endorsed by the makers of Aniimo.':
            'เครื่องมือที่แฟนเกมทำขึ้นเอง ไม่ใช่ของทางการ และไม่มีส่วนเกี่ยวข้องหรือได้รับการรับรองจากผู้พัฒนา Aniimo',
        'Your inputs are saved in your browser and never sent anywhere.':
            'ค่าที่คุณกรอกจะบันทึกไว้ในเบราว์เซอร์ของคุณเท่านั้น และไม่ถูกส่งไปที่ใด',
        'View the source code on GitHub': 'ดูซอร์สโค้ดบน GitHub',
        'Switch language': 'เปลี่ยนภาษา',

        // Modals
        'Facility Recipes': 'สูตรของสิ่งอำนวยการผลิต',
        'Every recipe in the game data, grouped by facility. This is a reference table, not tied to your owned facility counts or levels.':
            'สูตรทั้งหมดในข้อมูลเกม จัดกลุ่มตามสิ่งอำนวยการผลิต เป็นตารางอ้างอิง ไม่ขึ้นกับจำนวนหรือระดับที่คุณมี',
        'Loading recipe data...': 'กำลังโหลดข้อมูลสูตร...',
        'How It Works': 'หลักการทำงาน',
        'How to Use': 'วิธีใช้งาน',

        // Messages from app.js
        'Link copied. It includes your current setup.': 'คัดลอกลิงก์แล้ว ลิงก์นี้มีการตั้งค่าปัจจุบันของคุณ',
        'Copy the link above to share your setup.': 'คัดลอกลิงก์ด้านบนเพื่อแชร์การตั้งค่าของคุณ',
        'Could not create a share link for this setup.': 'ไม่สามารถสร้างลิงก์แชร์สำหรับการตั้งค่านี้ได้',
        'Your changes are saved in this browser.': 'การเปลี่ยนแปลงของคุณถูกบันทึกในเบราว์เซอร์นี้แล้ว',
        'This share link is invalid. Your saved setup was kept.': 'ลิงก์แชร์นี้ไม่ถูกต้อง การตั้งค่าที่บันทึกไว้ยังคงอยู่',
        'Shared setup loaded. Your saved setup is kept until you edit this one.':
            'โหลดการตั้งค่าที่แชร์มาแล้ว การตั้งค่าเดิมของคุณจะยังเก็บไว้จนกว่าคุณจะแก้ไขอันนี้',
        'Optimizer not ready. Please wait...': 'ตัวคำนวณยังไม่พร้อม กรุณารอสักครู่...',
        'Failed to load the optimizer. Please refresh the page.': 'โหลดตัวคำนวณไม่สำเร็จ กรุณารีเฟรชหน้าเว็บ',
        'Failed to load recipe data. Please refresh the page.': 'โหลดข้อมูลสูตรไม่สำเร็จ กรุณารีเฟรชหน้าเว็บ',
        'An unknown error occurred.': 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
        'Pick a recipe from the list.': 'เลือกสูตรจากรายการ',
        'Laying out…': 'กำลังจัดผัง…',
        "The layout couldn't be worked out.": 'ไม่สามารถจัดผังได้',
        'Nothing in this plan is carried to the Storage Unit.': 'ไม่มีอะไรในแผนนี้ที่ต้องขนไป Storage Unit',
        'No plan found with these Aniimo.': 'ไม่พบแผนที่ใช้ Aniimo ชุดนี้ได้',
        'No Aniimo needed.': 'ไม่ต้องใช้ Aniimo',
        'Nothing in this plan needs an Aniimo.': 'ไม่มีอะไรในแผนนี้ที่ต้องใช้ Aniimo',
        'Nothing profitable to produce with the current facilities.': 'ไม่มีสิ่งใดที่ผลิตแล้วได้กำไรด้วยสิ่งอำนวยการผลิตปัจจุบัน',
        "These facilities can't make everything it costs.": 'สิ่งอำนวยการผลิตเหล่านี้ผลิตของที่ต้องใช้ได้ไม่ครบ',
        "The level-up couldn't be planned.": 'ไม่สามารถวางแผนการเลื่อนระดับได้',
        'You already have everything it costs. This plan is for the most Home Coins.':
            'คุณมีของที่ต้องใช้ครบแล้ว แผนนี้จึงเน้นหา Home Coins ให้ได้มากที่สุด',
        'Ready now': 'พร้อมแล้ว',
        'Not made by this plan': 'แผนนี้ไม่ได้ผลิต',
        'The best Aniimo you have of each ability.': 'Aniimo ที่ดีที่สุดที่คุณมีในแต่ละความสามารถ',
        'Add the Aniimo you have under My Aniimo to plan with them.': 'เพิ่ม Aniimo ที่คุณมีในหัวข้อ Aniimo ของฉัน เพื่อวางแผนด้วยตัวที่มีจริง',
        "No Aniimo yet. Add the ones you have, or start from the Best plan's team.":
            'ยังไม่มี Aniimo เพิ่มตัวที่คุณมี หรือเริ่มจากทีมของแผนที่ดีที่สุด',
        "No Aniimo yet. Add the ones you have, or start from the Best plan\\'s team.":
            'ยังไม่มี Aniimo เพิ่มตัวที่คุณมี หรือเริ่มจากทีมของแผนที่ดีที่สุด',
        'Start from the Best team': 'เริ่มจากทีมที่ดีที่สุด',
        '+ Add Aniimo': '+ เพิ่ม Aniimo',
        '+ Ability': '+ ความสามารถ',
        '+ Add level': '+ เพิ่มระดับ',
        'Name': 'ชื่อ',
        'Carries produce to storage. How much work this is isn\'t known yet; add more if produce piles up.':
            'ขนผลผลิตไปเก็บ ยังไม่ทราบว่างานนี้หนักแค่ไหน ถ้าผลผลิตกองค้างให้เพิ่มจำนวน',
        'Busy on average': 'ความยุ่งเฉลี่ย',
        "By then you'll also have:": 'ถึงตอนนั้นคุณจะมีเพิ่มด้วย:',
        'Surplus:': 'ส่วนเกิน:',
        'Ready in': 'พร้อมในอีก',
        'RV level-ups': 'การเลื่อนระดับ RV',
        'Cost': 'ค่าใช้จ่าย',
        'Have': 'มีอยู่',
        'Need': 'ต้องการ',
        'How many': 'จำนวน',
        'Inputs': 'วัตถุดิบ',
        'Module': 'โมดูล',
        'Modules': 'โมดูล',
        'Priority': 'ลำดับความสำคัญ',
        'Producing': 'กำลังผลิต',
        'Product': 'สินค้า',
        'Profit per hour': 'กำไรต่อชั่วโมง',
        'Seeds': 'เมล็ด',
        'Sell': 'ขาย',
        'Share': 'สัดส่วน',
        'Sold per hour': 'ขายได้ต่อชั่วโมง',
        'Time': 'เวลา',
        'Total': 'รวม',
        'Where': 'ตำแหน่ง',
        'Why': 'เหตุผล',
        'Yield': 'ผลผลิต',
        'Plot': 'แปลง',
        'Idle': 'ว่าง',
        'idle': 'ว่าง',
        'not sold': 'ไม่ได้ขาย',
        'season': 'ฤดูกาล',
        'special': 'พิเศษ',
        'unverified': 'ยังไม่ยืนยัน',
        '(bonus)': '(โบนัส)',
        'On': 'เปิด',
        'Off': 'ปิด',
        'none': 'ไม่มี',
        'free': 'ฟรี',
        'any level': 'ระดับใดก็ได้',
        'Sells directly': 'ขายโดยตรง',
        'No further profitable use found': 'ไม่พบการนำไปใช้ที่ได้กำไรเพิ่ม',
        'Nothing it can make helps this plan': 'ไม่มีอะไรที่ผลิตได้ซึ่งช่วยแผนนี้',
        '(no Aniipod Maker yet)': '(ยังไม่มี Aniipod Maker)',
        'No Dance Pad Polisher yet': 'ยังไม่มี Dance Pad Polisher',
        'No Aniipod Maker yet': 'ยังไม่มี Aniipod Maker',
        'Where everything is carried': 'ที่ที่ทุกอย่างถูกขนไป',
        '(everything unlocked)': '(ปลดล็อกทั้งหมด)',

        // Facility categories and descriptions
        'Materials': 'วัตถุดิบ',
        'Environment': 'สภาพแวดล้อม',
        'Aniimo Materials': 'วัตถุดิบ Aniimo',
        'Materials Processing': 'การแปรรูปวัตถุดิบ',
        'Planting seeds and gathering': 'ปลูกเมล็ดและเก็บเกี่ยว',
        'Reclaiming land and mining': 'บุกเบิกที่ดินและทำเหมือง',
        'Processing with wind': 'แปรรูปด้วยพลังลม',
        'Perfumes and incense': 'น้ำหอมและธูปหอม',
        'Making things while playing': 'ผลิตของไปพร้อมกับการเล่น',
        'Lighting the homeland': 'ให้แสงสว่างแก่ homeland',
        'Harvesting, cutting, pickling and drying': 'เก็บเกี่ยว ตัด ดอง และตากแห้ง',
        'Handcrafted goods': 'งานฝีมือ',
        'Cooling the homeland': 'ทำความเย็นให้ homeland',
        'Cooking, smelting and heat': 'ทำอาหาร หลอมแร่ และให้ความร้อน',
        'Carrying produce to storage': 'ขนผลผลิตไปเก็บ',
        'Brewing, fetching water and watering': 'หมัก ตักน้ำ และรดน้ำ',

        // Solve progress
        'Fastest Level-Up': 'เลื่อนระดับเร็วที่สุด',
        'Most Home Coins': 'Home Coins มากที่สุด',
        "Home Coins with What's Left": 'Home Coins จากส่วนที่เหลือ',
        'Minimum Team Plan': 'แผนทีมขั้นต่ำ',
        'Backup Planner': 'ตัววางแผนสำรอง',
        'proven best': 'พิสูจน์แล้วว่าดีที่สุด',
        'best found in time': 'ดีที่สุดที่หาได้ในเวลาที่กำหนด',
        'checking…': 'กำลังตรวจสอบ…',
        'no gain': 'ไม่ดีขึ้น',
        'Running': 'กำลังทำงาน',
        'Done': 'เสร็จแล้ว',
        'Failed': 'ล้มเหลว',
        'Skipped': 'ข้าม',
        'Waiting': 'รอ',
        'No plan the model allows does better. Some of its options, such as how plots can be arranged around an environment building, come from a shortlist rather than every possibility.':
            'ไม่มีแผนใดในแบบจำลองที่ดีกว่านี้ ตัวเลือกบางอย่าง เช่น การจัดแปลงรอบอาคารสภาพแวดล้อม มาจากรายการที่คัดไว้ ไม่ใช่ทุกความเป็นไปได้',
        'The solver ran out of time before it could prove nothing does better.':
            'ตัวคำนวณหมดเวลาก่อนพิสูจน์ได้ว่าไม่มีแผนที่ดีกว่า',
        'Cancelled by a newer calculation': 'ถูกยกเลิกเพราะมีการคำนวณใหม่',
        'The planner stopped': 'ตัววางแผนหยุดทำงาน',

        // Recipe reference table and tooltips
        'Reclaiming': 'บุกเบิกดิน',
        'Sowing': 'หว่านเมล็ด',
        'Watering': 'รดน้ำ',
        'Reaping': 'เก็บเกี่ยว',
        'Collecting': 'เก็บผลผลิต',
        'Logging': 'ตัดไม้',
        'Not yet checked in game.': 'ยังไม่ได้ตรวจสอบในเกม',
        'Not yet checked in game': 'ยังไม่ได้ตรวจสอบในเกม',
        "Can't make this? Skip it and plan again": 'ทำสิ่งนี้ไม่ได้? ข้ามแล้ววางแผนใหม่',
        'How many you have that are alike': 'จำนวนตัวที่เหมือนกันที่คุณมี',
        'Remove this level': 'ลบระดับนี้',
        'Remove': 'ลบ',
        'Stop skipping': 'เลิกข้าม',
        'Takes a rare currency to unlock': 'ต้องใช้สกุลเงินหายากในการปลดล็อก',
        "The lowest ability level that can make this, and the best Aniimo for it: level 4, the top, with the facility's personality (+20% speed). For crops and trees, the ability each job needs, in order.":
            'ระดับความสามารถต่ำสุดที่ผลิตสิ่งนี้ได้ และ Aniimo ที่ดีที่สุดสำหรับมัน: ระดับ 4 ซึ่งสูงสุด พร้อมนิสัยที่ตรงกับสิ่งอำนวยการผลิต (เร็วขึ้น 20%) สำหรับพืชและต้นไม้ จะแสดงความสามารถที่แต่ละงานต้องใช้ตามลำดับ',
        'Grow time for crops and trees, before watering takes an eighth off it twice. Everything else lists workload: at 100% Efficiency a processor gets through one workload a second, a gathering facility 1.25 on a level-2 recipe and 1.5 on a level-3 one. An Aniimo at the level a recipe needs works at 100%; higher levels are faster, up to level 4 (at a processor, 300% one level above, then +100% per level; at gathering facilities each level adds half a workload a second, reading as +50% on a level-1 recipe, +40% on a level-2 one and +33% on a level-3 one).':
            'เวลาเติบโตของพืชและต้นไม้ ก่อนการรดน้ำสองครั้งที่ลดเวลาครั้งละหนึ่งในแปด อย่างอื่นแสดงเป็นปริมาณงาน (workload): ที่ประสิทธิภาพ 100% เครื่องแปรรูปทำได้หนึ่ง workload ต่อวินาที สิ่งอำนวยการผลิตประเภทเก็บรวบรวมทำได้ 1.25 สำหรับสูตรระดับ 2 และ 1.5 สำหรับสูตรระดับ 3 Aniimo ที่มีระดับเท่าที่สูตรต้องการทำงานที่ 100% ระดับสูงกว่าจะเร็วขึ้น สูงสุดถึงระดับ 4 (ที่เครื่องแปรรูป สูงกว่าหนึ่งระดับคือ 300% แล้วเพิ่ม 100% ต่อระดับ ที่สิ่งอำนวยการผลิตประเภทเก็บรวบรวม แต่ละระดับเพิ่มครึ่ง workload ต่อวินาที เท่ากับ +50% สำหรับสูตรระดับ 1, +40% สำหรับสูตรระดับ 2 และ +33% สำหรับสูตรระดับ 3)',

        // Long explanations in index.html
        "Every finished batch is carried to the Storage Unit (SU), so each facility is placed by its trips per hour times its straight-line distance to it: the busiest sit closest, idle ones go to the edge. Each environment building's plots can go anywhere its coverage still reaches them, so they sit on its Storage Unit side. No covered plot reaches another building's coverage, and a crop that needs an environment but is grown without one stays out of all of it, so every crop keeps the temperature the plan gave it. Crops that need no environment can go anywhere. Everything stays within the plots your RV level has open (each 20 by 15 tiles; in Advanced mode, the lowest RV level that allows what you entered), and the Storage Unit goes wherever the walking comes out least. Hover or tap a facility for its trips and distance. The diagram plays the homeland out in sped-up game time from when everything is set up: each finished batch goes to the Storage Unit (carrying takes no time here), and a recipe starts only once what it takes is there. A ring on each facility shows its batch, amber while it waits for materials. This is a close-packed arrangement worked out step by step, not a proven shortest one.":
            'ผลผลิตทุกรอบที่เสร็จจะถูกขนไปที่ Storage Unit (SU) สิ่งอำนวยการผลิตแต่ละอย่างจึงถูกวางตามจำนวนเที่ยวต่อชั่วโมงคูณระยะทางตรงไปยัง SU: อันที่ยุ่งที่สุดอยู่ใกล้ที่สุด อันที่ว่างอยู่ริมขอบ แปลงของอาคารสภาพแวดล้อมแต่ละหลังวางได้ทุกที่ที่ยังอยู่ในพื้นที่ครอบคลุม จึงอยู่ฝั่งที่ใกล้ Storage Unit แปลงที่ถูกครอบคลุมจะไม่ไปอยู่ในพื้นที่ของอาคารอื่น และพืชที่ต้องการสภาพแวดล้อมแต่ปลูกโดยไม่มีอาคารจะอยู่นอกพื้นที่ครอบคลุมทั้งหมด พืชทุกต้นจึงได้อุณหภูมิตามที่แผนกำหนด พืชที่ไม่ต้องการสภาพแวดล้อมวางที่ไหนก็ได้ ทุกอย่างอยู่ในแปลงที่ระดับ RV ของคุณเปิดไว้ (แปลงละ 20×15 ช่อง ในแบบละเอียดใช้ RV ระดับต่ำสุดที่รองรับสิ่งที่คุณกรอก) และ Storage Unit จะอยู่ตรงที่เดินน้อยที่สุด ชี้หรือแตะสิ่งอำนวยการผลิตเพื่อดูจำนวนเที่ยวและระยะทาง แผนภาพจะจำลอง homeland ด้วยเวลาในเกมแบบเร่งความเร็ว นับจากตอนตั้งค่าทุกอย่างเสร็จ: ผลผลิตแต่ละรอบไปที่ Storage Unit (การขนไม่นับเวลา) และสูตรจะเริ่มเมื่อมีวัตถุดิบครบแล้ว วงแหวนบนสิ่งอำนวยการผลิตแสดงความคืบหน้าของรอบ เป็นสีเหลืองอำพันเมื่อรอวัตถุดิบ นี่คือการจัดวางแบบชิดกันที่คำนวณทีละขั้น ไม่ใช่ผังที่พิสูจน์แล้วว่าเดินสั้นที่สุด',
        'An Aniimo can take any job needing its ability at or below its level while it has hours to spare, as long as no two of its facilities want opposite personalities. It has four personalities, one from each pair, shown as letters over its portrait: Instinctive or Energetic (I/E), Nimble or Practical (N/S), Faithful or Tenacious (F/T), Playful or Judicious (P/J). Facilities with a resident Aniimo (Sandcastle, Dewy House and the like) need one each, and so does each Heat Furnace (Fire), Cooling Unit (Ice) and Sunlamp (Light) in use. With My Aniimo, Farmland and Woodland jobs only need someone able to do each; they\'re quick, so they aren\'t counted against anyone\'s hours. Not yet checked in game: each recipe\'s minimum ability level, the Farmland and Woodland jobs, and whether an environment building\'s Aniimo level or personality matters.':
            'Aniimo หนึ่งตัวรับงานใดก็ได้ที่ต้องการความสามารถของมันในระดับเท่ากับหรือต่ำกว่าระดับของมัน ตราบที่ยังมีชั่วโมงว่าง และสิ่งอำนวยการผลิตสองแห่งของมันไม่ต้องการนิสัยตรงข้ามกัน Aniimo มีนิสัยสี่อย่าง คู่ละหนึ่ง แสดงเป็นตัวอักษรบนรูป: Instinctive หรือ Energetic (I/E), Nimble หรือ Practical (N/S), Faithful หรือ Tenacious (F/T), Playful หรือ Judicious (P/J) สิ่งอำนวยการผลิตที่มี Aniimo ประจำ (Sandcastle, Dewy House และอื่น ๆ) ต้องใช้แห่งละหนึ่งตัว เช่นเดียวกับ Heat Furnace (Fire), Cooling Unit (Ice) และ Sunlamp (Light) ทุกเครื่องที่ใช้ เมื่อใช้ Aniimo ของฉัน งาน Farmland และ Woodland ต้องการแค่ตัวที่ทำงานนั้นได้ เพราะใช้เวลาสั้น จึงไม่นับรวมในชั่วโมงทำงาน ยังไม่ได้ตรวจสอบในเกม: ระดับความสามารถขั้นต่ำของแต่ละสูตร งาน Farmland และ Woodland และระดับหรือนิสัยของ Aniimo ที่อาคารสภาพแวดล้อมมีผลหรือไม่',

    };

    const NUM = '([\\d.,]+)';
    // [regex, replacement] pairs for strings with values in them, tried in order.
    const PATTERNS = [
        [new RegExp(`^${NUM} facilities and 4 modules at RV ${NUM}$`), '$1 สิ่งอำนวยการผลิตและ 4 โมดูลที่ RV $2'],
        [new RegExp(`^${NUM} \\(everything unlocked\\)$`), '$1 (ปลดล็อกทั้งหมด)'],
        [new RegExp(`^${NUM} of ${NUM}$`), '$1 จาก $2'],
        [new RegExp(`^RV ${NUM} level-up$`), 'เลื่อนระดับเป็น RV $1'],
        [new RegExp(`^RV ${NUM} costs$`), 'ค่าใช้จ่ายของ RV $1'],
        [new RegExp(`^Profit until RV ${NUM}$`), 'กำไรจนถึง RV $1'],
        [/^in (.+)$/, 'ในอีก $1'],
        [/^Target (.+)$/, 'เป้าหมาย $1'],
        [/^Current (.+)$/, '$1 ปัจจุบัน'],
        [/^(.+) produced$/, '$1 ที่ผลิตได้'],
        [/^Seeds per (second|minute|hour|day): one per planting, for every Farmland and Woodland crop in the plan\.$/,
            (m, unit) => `เมล็ดต่อ${{ second: 'วินาที', minute: 'นาที', hour: 'ชั่วโมง', day: 'วัน' }[unit]}: หนึ่งเมล็ดต่อการปลูกหนึ่งครั้ง สำหรับพืชทุกชนิดใน Farmland และ Woodland ในแผน`],
        [/^Seeds (.+): one per planting, for every Farmland and Woodland crop in the plan\.$/,
            'เมล็ด $1: หนึ่งเมล็ดต่อการปลูกหนึ่งครั้ง สำหรับพืชทุกชนิดใน Farmland และ Woodland ในแผน'],
        [new RegExp(`^Best plan found in the time allowed; the best possible is at most ${NUM}% higher\\.$`),
            'แผนที่ดีที่สุดที่หาได้ในเวลาที่กำหนด แผนที่ดีที่สุดจริงอาจสูงกว่านี้ไม่เกิน $1%'],
        [/^The exact planner couldn't run(.*), so this plan comes from the backup planner and may not be the very best\. Reloading the page usually fixes this\.$/,
            'ตัววางแผนแบบแม่นยำทำงานไม่ได้$1 แผนนี้จึงมาจากตัววางแผนสำรองและอาจไม่ใช่แผนที่ดีที่สุด การโหลดหน้าเว็บใหม่มักแก้ปัญหานี้ได้'],
        [new RegExp(`^${NUM} recipes? in this plan (?:hasn't|haven't) been checked in game yet \\(tagged below\\)\\. If any of those numbers are off, so is this plan\\.$`),
            'มี $1 สูตรในแผนนี้ที่ยังไม่ได้ตรวจสอบในเกม (มีป้ายกำกับด้านล่าง) ถ้าตัวเลขเหล่านั้นคลาดเคลื่อน แผนนี้ก็จะคลาดเคลื่อนด้วย'],
        [/^Skipping (.+)\.$/, 'ข้าม $1'],
        [new RegExp(`^${NUM} of your ${NUM} Aniimo have work in this plan\\.?$`), 'Aniimo $1 จาก $2 ตัวของคุณมีงานในแผนนี้'],
        [new RegExp(`^That's ${NUM} Aniimo, more than the ${NUM} an RV level ${NUM} homeland holds\\.$`),
            'นั่นคือ Aniimo $1 ตัว มากกว่า $2 ตัวที่ homeland ระดับ RV $3 รองรับได้'],
        [/^Game time since everything was set up, at (.+)× speed$/, 'เวลาในเกมนับตั้งแต่ตั้งค่าทุกอย่างเสร็จ ที่ความเร็ว $1×'],
        [new RegExp(`^RV ${NUM} is the top level, so there's no level-up to plan\\.$`), 'RV $1 เป็นระดับสูงสุดแล้ว จึงไม่มีการเลื่อนระดับให้วางแผน'],
        [new RegExp(`^There's no level-up cost for RV ${NUM}\\.$`), 'ไม่มีข้อมูลค่าใช้จ่ายในการเลื่อนระดับเป็น RV $1'],
        [/^(Cool|Warm|Freeze|Scorching|Adequate) coverage$/, 'พื้นที่ครอบคลุม $1'],
        [new RegExp(`^${NUM} trips/hour to the Storage Unit, ${NUM} tiles each on average, in the ${NUM} plots? open at RV ${NUM}\\.(.*)$`),
            (m, trips, tiles, plots, rv, rest) => `ขนไป Storage Unit ${trips} เที่ยว/ชั่วโมง เฉลี่ยเที่ยวละ ${tiles} ช่อง ในแปลงที่เปิดแล้ว ${plots} แปลงที่ RV ${rv}${rest}`],
        [/^(.+) trips\/hour · (.+) tiles from storage$/, '$1 เที่ยว/ชั่วโมง · ห่างจากที่เก็บ $2 ช่อง'],
        [/^(.+) trips\/hour$/, '$1 เที่ยว/ชั่วโมง'],
        [/^Unlock (.+)$/, 'ปลดล็อก $1'],
        [new RegExp(`^Plant cost: ${NUM}$`), 'ค่าปลูก: $1'],
        [new RegExp(`^${NUM} workload$`), '$1 workload'],
        [/^best Lv\.(\d+)(?: (.+))?$/, (m, lv, who) => `ดีที่สุด Lv.${lv}${who ? ' ' + who : ''}`],
        [/^(.+) ×(\d+)$/, (m, a, n) => `${translate(a) || a} ×${n}`],
        [/^(.+) only$/, 'เฉพาะ $1'],
        [/^Recipe Note: (.+)$/, 'บันทึกสูตร: $1'],
        [new RegExp(`^Checking ${NUM} of ${NUM}…(.*)$`), (m, a, b, rest) => `กำลังตรวจสอบ ${a} จาก ${b}…${more(rest)}`],
        [/^Nothing left to unlock or upgrade\.(.*)$/, (m, rest) => `ไม่มีอะไรเหลือให้ปลดล็อกหรืออัปเกรดแล้ว${more(rest)}`],
        [new RegExp(`^No improvements found \\(${NUM} checked\\)\\.(.*)$`), (m, n, rest) => `ไม่พบสิ่งที่ช่วยให้ดีขึ้น (ตรวจแล้ว ${n} รายการ)${more(rest)}`],
        [new RegExp(`^Ranked by (.+)\\. ${NUM} of ${NUM} help\\.(.*)$`), (m, by, a, b, rest) =>
            `เรียงตาม${by.replace(/^level-up time/, 'เวลาเลื่อนระดับ').replace(/, then /, ' แล้วตามด้วย ')} ช่วยได้ ${a} จาก ${b} รายการ${more(rest)}`],
        [/^Used for (.+); the rest sells directly$/, 'ใช้ทำ $1 ส่วนที่เหลือขายโดยตรง'],
        [/^Used for (.+)$/, 'ใช้ทำ $1'],
        [/^Unskip (.+)$/, 'เลิกข้าม $1'],
        [/^Most (.+)$/, '$1 มากที่สุด'],
        [/^(.+) This plan is for the most Home Coins\.$/, (m, a) => `${translate(a) || a} แผนนี้จึงเน้นหา Home Coins ให้ได้มากที่สุด`],
        [/^(.+) Plans will go for the most Home Coins\.$/, (m, a) => `${translate(a) || a} แผนจะเน้นหา Home Coins ให้ได้มากที่สุด`],
        [new RegExp(`^Within RV ${NUM} limits\\.$`), 'อยู่ในขีดจำกัดของ RV $1'],
        [/^Level-up in (.+)$/, 'เลื่อนระดับในอีก $1'],
        [/^(.+) level-up \((.+)\)$/, '$1 เวลาเลื่อนระดับ ($2)'],
        [/^(.+) any level$/, '$1 ระดับใดก็ได้'],
        [/^(.+) level$/, 'ระดับ $1'],
    ];

    const NAMES = window.ANIIMAX_TH_NAMES || {};
    const PREFIXES = window.ANIIMAX_TH_NAME_PREFIXES || {};
    const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
    const escapeRe = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Thai for one game name, including "Quick"/"Premium"/"Advanced" variants of a named item.
    function nameTh(name) {
        if (has(NAMES, name)) return NAMES[name];
        const m = name.match(/^(\S+) (.+)$/);
        if (m && has(PREFIXES, m[1])) {
            const base = nameTh(m[2]);
            if (base) return PREFIXES[m[1]](base);
        }
        return null;
    }

    // Every game name in `text` swapped for its Thai, longest names first so "Moonray Wheat"
    // wins over "Wheat".
    const NAME_RE = new RegExp(
        `(?<![A-Za-z])(?:(${Object.keys(PREFIXES).map(escapeRe).join('|')}) )?(${Object.keys(NAMES)
            .sort((a, b) => b.length - a.length).map(escapeRe).join('|')})(?![A-Za-z])`, 'g');

    const RATE_UNITS = { sec: 'วินาที', min: 'นาที', hour: 'ชั่วโมง', day: 'วัน' };

    function replaceNames(text) {
        if (!Object.keys(NAMES).length) return text;
        return text
            .replace(NAME_RE, (whole, prefix, name) =>
                prefix && has(PREFIXES, prefix) ? PREFIXES[prefix](NAMES[name]) : NAMES[name])
            .replace(/\/(sec|min|hour|day)\b/g, (m, unit) => '/' + RATE_UNITS[unit]);
    }

    // Words that may stay in Latin letters in Thai text: units and the game's own abbreviations.
    const KEEP_WORDS = /\b(?:RV|workload|Lv|SU|EXP|Aniimo|Aniipods?|Pro|Mega|ms|[hmds]|HiGHS)\b/g;

    // The translated tail of a sentence app.js joins onto another, e.g. " Within RV 9 limits."
    function more(rest) {
        const tail = (rest || '').trim();
        return tail ? ' ' + (translate(tail) || tail) : '';
    }

    function translate(text) {
        const key = text.replace(/\s+/g, ' ').trim();
        if (!key) return null;
        if (has(TH, key)) return replaceNames(TH[key]);
        const name = nameTh(key);
        if (name) return name;
        for (const [re, rep] of PATTERNS) {
            if (re.test(key)) return replaceNames(key.replace(re, rep));
        }
        // Names, numbers and symbols only, e.g. "Wheat (Farmland)", "Heat Furnace 2" or
        // "Lv.1: Quick Wheat": swap the names, as long as no other English is left over.
        const swapped = replaceNames(key);
        if (swapped !== key && !/[A-Za-z]{2,}/.test(swapped.replace(KEEP_WORDS, ''))) return swapped;
        return null;
    }

    const ATTRS = ['title', 'placeholder', 'aria-label', 'data-tooltip', 'data-label', 'data-tip'];
    const SKIP_SELECTOR = 'script, style, textarea, mjx-container, [data-i18n-skip], .modal-body[data-i18n-swap]';

    // node -> { src, out }: the English it came with and the Thai it was given.
    const textState = new WeakMap();
    // element -> { [attr]: { src, out } }
    const attrState = new WeakMap();

    function skipped(el) {
        return !el || !!el.closest(SKIP_SELECTOR);
    }

    function applyText(node) {
        const rec = textState.get(node);
        const current = node.nodeValue;
        const src = rec && rec.out === current ? rec.src : current;
        if (lang !== 'th' || skipped(node.parentElement)) {
            if (rec && rec.out === current) node.nodeValue = rec.src;
            textState.delete(node);
            return;
        }
        const t = translate(src);
        if (t == null) {
            textState.delete(node);
            return;
        }
        const out = src.match(/^\s*/)[0] + t + src.match(/\s*$/)[0];
        textState.set(node, { src, out });
        if (current !== out) node.nodeValue = out;
    }

    function applyAttr(el, name) {
        if (!el.hasAttribute(name)) return;
        let recs = attrState.get(el);
        const rec = recs && recs[name];
        const current = el.getAttribute(name);
        const src = rec && rec.out === current ? rec.src : current;
        if (lang !== 'th' || skipped(el)) {
            if (rec) {
                if (rec.out === current) el.setAttribute(name, rec.src);
                delete recs[name];
            }
            return;
        }
        // data-tooltip uses line breaks between entries; translate each line.
        const t = src.includes('\n')
            ? src.split('\n').map(line => translate(line) ?? line).join('\n')
            : translate(src);
        if (t == null || t === src) {
            if (rec) delete recs[name];
            return;
        }
        if (!recs) attrState.set(el, recs = {});
        recs[name] = { src, out: t };
        if (current !== t) el.setAttribute(name, t);
    }

    // A datalist option shows its value; in Thai it also gets a label, so the list reads in Thai
    // while picking still fills in the English value the app looks up.
    const optionLabels = new WeakSet();

    function applyOptionLabel(el) {
        if (el.tagName !== 'OPTION' || !el.parentElement || el.parentElement.tagName !== 'DATALIST') return;
        const t = lang === 'th' ? translate(el.value) : null;
        if (t) {
            el.label = t;
            optionLabels.add(el);
        } else if (optionLabels.has(el)) {
            el.removeAttribute('label');
            optionLabels.delete(el);
        }
    }

    function applyTree(root) {
        if (root.nodeType === Node.TEXT_NODE) {
            applyText(root);
            return;
        }
        if (root.nodeType !== Node.ELEMENT_NODE) return;
        ATTRS.forEach(name => applyAttr(root, name));
        applyOptionLabel(root);
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
            if (node.nodeType === Node.TEXT_NODE) applyText(node);
            else {
                ATTRS.forEach(name => applyAttr(node, name));
                applyOptionLabel(node);
            }
            node = walker.nextNode();
        }
    }

    // ---- Long-form modals ----

    const enHtml = {};

    function swapModals() {
        document.querySelectorAll('.modal-body[data-i18n-swap]').forEach(body => {
            const key = body.dataset.i18nSwap;
            if (!(key in enHtml)) enHtml[key] = body.innerHTML;
            const html = lang === 'th' && TH_HTML[key] ? replaceNames(TH_HTML[key]) : enHtml[key];
            if (body.dataset.i18nLang === lang) return;
            if (window.MathJax && MathJax.typesetClear) MathJax.typesetClear([body]);
            body.innerHTML = html;
            body.dataset.i18nLang = lang;
            if (body.closest('.modal.show') && window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([body]);
        });
    }

    function updateLangButton() {
        const button = document.getElementById('langToggle');
        if (!button) return;
        // The button names the language it switches to, in that language.
        button.textContent = lang === 'th' ? 'english' : 'ไทย';
        button.setAttribute('data-i18n-skip', '');
        button.title = lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย';
    }

    let docTitle = null;

    function applyAll() {
        document.documentElement.lang = lang;
        if (docTitle == null) docTitle = document.title;
        document.title = lang === 'th' ? (translate(docTitle) || docTitle) : docTitle;
        swapModals();
        applyTree(document.body);
        updateLangButton();
    }

    window.setLanguage = function (next) {
        lang = next === 'th' ? 'th' : 'en';
        save(lang);
        applyAll();
    };

    window.toggleLanguage = function () {
        window.setLanguage(lang === 'th' ? 'en' : 'th');
    };

    window.currentLanguage = () => lang;

    // The Thai for an English string the page shows, or null (also null in English).
    window.translateText = text => (lang === 'th' && text ? translate(text) : null);

    function start() {
        applyAll();
        new MutationObserver(mutations => {
            mutations.forEach(m => {
                if (m.type === 'characterData') applyText(m.target);
                else if (m.type === 'attributes') applyAttr(m.target, m.attributeName);
                else m.addedNodes.forEach(applyTree);
            });
        }).observe(document.body, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: ATTRS,
        });
    }

    // ---- Thai bodies for the Help and Math modals ----

    const TH_HTML = {
        help: `
                <h3>1. บอกว่าคุณสร้างอะไรไว้แล้วบ้าง</h3>
                <p><strong>แบบง่าย</strong>: เลือกระดับ RV ของคุณ แล้วเครื่องคำนวณจะถือว่าคุณสร้างและอัปเกรดทุกอย่างที่ระดับนั้นอนุญาตไว้แล้ว <strong>แบบละเอียด</strong>: กำหนดจำนวนและระดับของสิ่งอำนวยการผลิตและโมดูลอัปเกรดทุกตัวเอง ในแบบละเอียด ปุ่ม "เติมค่าจากระดับ RV" จะตั้งค่าทุกอย่างตามที่ระดับ RV นั้นอนุญาต เพื่อใช้เป็นจุดเริ่มต้น</p>
                <p>ในหัวข้อ <strong>สูตร</strong> สูตรพิเศษ (Rose Shortbread, Potato Kvass และอื่น ๆ อีกเล็กน้อย) ต้องใช้สกุลเงินหายากในการปลดล็อก แผนจึงไม่ใช้สูตรเหล่านี้จนกว่าคุณจะติ๊กเลือกสูตรที่มี</p>
                <p>ในหัวข้อ <strong>สูตร</strong> เช่นกัน ให้เพิ่มสิ่งที่คุณยังทำไม่ได้ เช่น สูตรที่ยังไม่ได้ปลดล็อก แผนจะไม่ใช้สูตรเหล่านั้น ปุ่ม ✕ ข้างสินค้าในแผนจะข้ามสินค้านั้นและวางแผนใหม่</p>

                <h3>2. เลือกกลยุทธ์</h3>
                <p><strong>เลื่อนระดับ</strong> จะหาของทุกอย่างที่ RV ระดับถัดไปต้องใช้ให้เร็วที่สุด ได้แก่ Home Coins กับ Wood Blocks และ Mineral Sand หรือตั้งแต่ RV 7 เป็นไอเท็มจาก Woodworking Bench และ Chimney Kiln ในหัวข้อ "ของที่คุณมีอยู่แล้ว" ให้กรอกสิ่งที่คุณมี Wood Blocks, Mineral Sand และขั้นที่ต่ำกว่าก็นับด้วย เพราะ Bench และ Kiln แปรรูปขึ้นไปได้ ระหว่างทางแผนจะยังหา Home Coins ให้ได้มากที่สุด ในแบบละเอียดคุณเลือกได้ว่าจะวางแผนไปถึง RV ระดับใด</p>
                <p><strong>ลำดับความสำคัญ</strong> ให้คุณจัดลำดับสิ่งที่ต้องการ: Home Coins, Aniimo EXP (ไอเท็ม Growth จาก Dance Pad Polisher), Aniipods (ขั้นที่ดีที่สุดที่ Aniipod Maker ของคุณทำได้ เพราะยิ่งดียิ่งจับได้ดี), Wood Blocks และ Mineral Sand เปิดอันที่ต้องการแล้วลากจัดลำดับ แผนจะผลิตอันดับแรกให้ได้มากที่สุด แล้วจึงอันดับถัดไปเท่าที่ยังทำได้ ส่วนที่เหลือไปทำ Home Coins การ์ดอัตราจะแสดงผลของแต่ละอย่าง</p>

                <h3>3. หาแผนที่ดีที่สุด</h3>
                <p>กด "หาแผนที่ดีที่สุด" เพื่อดูว่าการเลื่อนระดับใช้เวลานานเท่าไร (หรืออัตราที่ดีที่สุดของคุณ) และสิ่งอำนวยการผลิตแต่ละอย่างควรผลิตอะไร ตั้งค่าครั้งเดียวแล้วปล่อยให้ทำงานไปได้เลย ทุกอย่างที่กรอกจะบันทึกไว้ในเบราว์เซอร์ ปุ่ม "ล้างค่าที่บันทึกไว้" จะรีเซ็ตค่าทั้งหมด</p>

                <h3>4. ตั้งเป้าหมาย (ไม่บังคับ)</h3>
                <p>เลือกสิ่งที่คุณตั้งเป้า กรอกจำนวนเป้าหมายและจำนวนที่มีอยู่ตอนนี้ การ์ดจะบอกว่าใช้เวลานานเท่าไรและตอนนั้นคุณจะมีอะไรเพิ่มอีกบ้าง อัปเดตทันทีขณะพิมพ์</p>

                <h3>ทำความเข้าใจผลลัพธ์</h3>
                <ul>
                    <li><strong>ทีม Aniimo</strong>: Aniimo ที่ควรมีใน homeland สำหรับการตั้งค่าที่เร็วที่สุด (ดีที่สุด) หรือขั้นต่ำที่พอใช้ได้ (ขั้นต่ำ) <strong>Aniimo ของฉัน</strong> จะวางแผนด้วย Aniimo ที่คุณกรอกไว้แทน และแสดงว่าแต่ละตัวทำอะไร เปิดดูเพื่อดูรายการทั้งหมด</li>
                    <li><strong>เลื่อนระดับ</strong>: อีกนานเท่าไรคุณจะมีของครบสำหรับการเลื่อนระดับ และแต่ละอย่างได้มาเร็วแค่ไหน (เลือกหน่วยที่หัวคอลัมน์) อันที่ช้าที่สุดจะเป็นตัวหนา ส่วนเกินคือสิ่งที่เหลือเมื่อพร้อม เช่น Home Coins หรือแร่ที่เกินมา</li>
                    <li><strong>อัตราของคุณ</strong>: เมื่อใช้ลำดับความสำคัญ จะแสดงสิ่งที่แผนผลิตได้ของแต่ละลำดับตามที่คุณเรียง แล้วตามด้วย Home Coins จากส่วนที่เหลือ ต่อวินาที นาที ชั่วโมง หรือวัน</li>
                    <li><strong>เมล็ดที่ต้องปลูก</strong>: เมล็ดที่ Farmland และ Woodland ของคุณใช้และราคา รวมจนถึงการเลื่อนระดับ (เมื่อใช้เลื่อนระดับ) หรือตามอัตราที่เลือก (เมื่อใช้ลำดับความสำคัญ)</li>
                    <li><strong>กำไรแยกตามสินค้า</strong>: เมื่อใช้เลื่อนระดับ แสดงว่าสินค้าแต่ละอย่างทำเงินได้เท่าไรต่อชั่วโมงและรวมจนกว่าจะพร้อมเลื่อนระดับ</li>
                    <li><strong>สิ่งอำนวยการผลิตแต่ละอย่างควรทำอะไร</strong>: ตั้งค่าแต่ละสิ่งอำนวยการผลิตให้ทำอะไร โดยทำงานพร้อมกันทั้งหมด สูตรที่มีป้าย "ยังไม่ยืนยัน" ยังไม่ได้ตรวจสอบในเกม</li>
                    <li><strong>โอกาสในการพัฒนา</strong>: การเปลี่ยนแปลงที่คุณทำได้ (สูตรที่ปลดล็อกได้ ระดับ Aniimo และในแบบละเอียดคือโมดูลหรือสิ่งอำนวยการผลิต) เรียงตามว่าจะช่วยให้แผนดีขึ้นมากแค่ไหน</li>
                    <li><strong>ผัง Homeland</strong>: ตำแหน่งที่ควรวางสิ่งอำนวยการผลิตแต่ละอย่าง เพื่อให้อันที่ยุ่งที่สุดอยู่ใกล้ Storage Unit</li>
                    <li><strong>ตั้งเป้าหมาย</strong>: เมื่อใช้ลำดับความสำคัญ จะบอกว่าใช้เวลานานเท่าไรจึงถึงจำนวนเป้าหมายของ Home Coins หรือลำดับความสำคัญที่เปิดอยู่ และตอนนั้นคุณจะมีอะไรเพิ่มอีกบ้าง</li>
                </ul>
                <h3>ภาษา</h3>
                <p>กดปุ่ม "ไทย" / "english" ที่มุมบนเพื่อสลับภาษา ชื่อในเกม (สิ่งอำนวยการผลิต ไอเท็ม ความสามารถ) เป็นชื่อแปลโดยแฟน อาจไม่ตรงกับชื่อภาษาไทยในเกมทุกคำ</p>
`,
        math: `
                <h3>แบบจำลอง</h3>
                <p>ทุกแผนคือโปรแกรมจำนวนเต็มผสม (mixed-integer program) หนึ่งชุดที่ครอบคลุมทุกสูตรและทุกสิ่งอำนวยการผลิตพร้อมกัน แก้ด้วย <a href="https://highs.dev" target="_blank" rel="noopener">HiGHS</a> สูตร \\(r\\) แต่ละสูตรที่ระดับสิ่งอำนวยการผลิตและโมดูลของคุณปลดล็อก จะมีอัตรา \\(b_r\\) (จำนวนรอบต่อวินาที) และจำนวนหน่วยเป็นจำนวนเต็ม \\(u_r\\) ที่กำหนดให้: แปลงสำหรับพืช หรือเครื่องสำหรับของแปรรูป</p>
                <div class="math-block">\\[ \\max \\ \\sum_i p_i \\, s_i \\;-\\; \\sum_r c_r \\, b_r \\]</div>
                <p>โดย \\(s_i\\) คือปริมาณไอเท็ม \\(i\\) ที่ขายต่อวินาทีที่ราคา \\(p_i\\) และ \\(c_r\\) คือค่าเมล็ดของพืช ในช่วง Harvest Moon Festival เมล็ดพืชประจำฤดูกาลใช้ Moonray Wheat แทน ซึ่งแผนถือว่ามีไม่จำกัด ภายใต้เงื่อนไข:</p>
                <ul>
                    <li><strong>หน่วยเต็ม</strong> \\(b_r \\, t_r \\le u_r\\) โดย \\(u_r\\) เป็นจำนวนเต็ม และ \\(t_r\\) คือเวลาต่อรอบ หนึ่งหน่วยทำสูตรเดียวและเปิดทิ้งไว้</li>
                    <li><strong>สมดุลไอเท็ม</strong> ทุกอย่างที่ผลิตต้องพอกับที่สูตรอื่นใช้รวมกับที่ขาย สูตรแบบ quick ให้ไอเท็มเดียวกับแบบปกติ</li>
                    <li><strong>สิ่งที่คุณมี</strong> สำหรับทุกสิ่งอำนวยการผลิตและระดับ \\(L\\) จำนวนหน่วยของสูตรที่ต้องการระดับ \\(L\\) ขึ้นไปรวมกันต้องไม่เกินจำนวนที่คุณมีในระดับนั้น แปลงระดับสูงทำสูตรระดับต่ำได้</li>
                    <li><strong>สภาพแวดล้อมการเติบโต</strong> พืชที่ต้องการ Cool, Warm, Freeze หรือ Scorching จะโตเต็มความเร็วบนแปลงที่ Heat Furnace หรือ Cooling Unit ตั้งโหมดนั้นครอบคลุม และโตช้ากว่าบนแปลงที่ไม่ถูกครอบคลุม (ดูด้านล่าง) พืช Adequate ต้องใช้ Sunlamp และโตที่อื่นไม่ได้</li>
                </ul>
                <p>HiGHS พิสูจน์ว่าแผนนี้ดีที่สุดเท่าที่เป็นไปได้ ในบางกรณีที่ใช้เวลาเกิน 30 วินาที จะหยุดพร้อมแผนที่ดีที่สุดที่หาได้ และผลลัพธ์จะบอกว่าอาจห่างจากแผนที่ดีที่สุดเท่าไร ทุกแผนจะถูกตรวจสอบซ้ำอีกครั้งก่อนแสดง</p>

                <h3>เวลาต่อรอบ</h3>
                <p>พืชและต้นไม้ใช้เวลาเติบโตตามปกติ ลบด้วยการรดน้ำของ Aniimo: แปลงจะขอน้ำสองครั้งระหว่างโต ตอนเหลือเวลาสองในสามและหนึ่งในสาม และการรดแต่ละครั้งลดเวลาหนึ่งในแปดของเวลาพืชนั้น พืช 40 นาทีจะเหลือ 30 นาที และพืช 4 นาทีจะเหลือ 3 นาที พืชที่ขาดสภาพแวดล้อมจะโตช้าลงแต่ยังลดเวลาได้เท่าเดิม เช่น พืช Warm ที่ไม่มีอาคารใช้ 50 นาทีและรดน้ำแล้วเหลือ 40 นาที ส่วนนี้ยังไม่ได้ตรวจสอบในเกม</p>
                <p>อย่างอื่นมีปริมาณงาน (workload) และเวลาที่ใช้ขึ้นกับประสิทธิภาพ (Efficiency) \\(e\\) ของ Aniimo ที่แสดงในหน้าจอสิ่งอำนวยการผลิต และอัตราพื้นฐาน \\(r\\):</p>
                <div class="math-block">\\[ t = \\frac{\\text{workload}}{r \\times e \\times 1.2^{\\,\\text{personality}}} \\]</div>
                <p>ที่เครื่องแปรรูป \\(r\\) คือหนึ่ง workload ต่อวินาที ที่สิ่งอำนวยการผลิตประเภทเก็บรวบรวม (Well, Mine, Sandcastle, Dewy House และอื่น ๆ) รวมถึง Dance Pad Polisher และ Aniipod Maker จะสูงขึ้นสำหรับสูตรที่ต้องการความสามารถระดับสูง: 1 ต่อวินาทีที่ระดับ 1, 1.25 ที่ระดับ 2 และ 1.5 ที่ระดับ 3 ตัวอย่างเช่น Growth Fruit มี workload 5,400 ใช้เวลาหนึ่งชั่วโมงที่ 100%</p>
                <p>ประสิทธิภาพ \\(e\\) ขึ้นกับระดับความสามารถของ Aniimo เทียบกับระดับที่สูตรต้องการ ถ้าเท่ากันพอดีคือ 100% ที่เครื่องแปรรูป สูงกว่าที่สูตรต้องการหนึ่งระดับคือ 300% และแต่ละระดับหลังจากนั้นเพิ่มอีก 100% (400%, 500%) ที่สิ่งอำนวยการผลิตประเภทเก็บรวบรวม แต่ละระดับที่สูงกว่าเพิ่มครึ่ง workload ต่อวินาทีไม่ว่าสูตรต้องการระดับใด เมื่อเทียบกับอัตราพื้นฐานของสูตรจึงเท่ากับ +50% ต่อระดับสำหรับสูตรระดับ 1, +40% สำหรับสูตรระดับ 2 และ +33% สำหรับสูตรระดับ 3 ส่วน Dance Pad Polisher และ Aniipod Maker เพิ่ม 40% ต่อระดับ เทอมนิสัย (personality) นับเฉพาะเมื่อ Aniimo มีนิสัยตรงกับสิ่งอำนวยการผลิต (+20%) โดย Polisher และ Aniipod Maker ไม่มีนิสัยประจำ ระดับความสามารถสูงสุดคือ 4</p>

                <h3>การครอบคลุมสภาพแวดล้อม</h3>
                <p>สภาพแวดล้อมเป็นขั้นของอุณหภูมิ: Freeze -2, Cool -1, ไม่มีอาคาร 0, Warm +1, Scorching +2 พืชโตที่ 100% ในขั้นของตัวเอง 80% เมื่อห่างหนึ่งขั้น 50% เมื่อห่างสองขั้น และ 20% เมื่อห่างกว่านั้น แปลงที่ไม่ถูกครอบคลุมเป็นกลาง พืช Cool หรือ Warm จึงยังได้ 80% และพืช Freeze หรือ Scorching ได้ 50% บางครั้งแผนจึงปลูกโดยไม่มีอาคารเลย Adequate แยกต่างหาก พืชเหล่านั้นต้องใช้ Sunlamp ประสิทธิภาพจะยืดเวลาเติบโต เช่น Rose ที่ 80% ใช้ 50 นาทีแทน 40 นาทีสำหรับ 8 ดอกเท่าเดิม ก่อนนับการรดน้ำ</p>
                <p>อุณหภูมิจะรวมกันในจุดที่อาคารสองหลังครอบคลุมแปลงเดียวกัน โดยจำกัดที่ -2 และ +2 และเกมจะแสดงผลบนแปลง: Scorching กับ Cool รวมกันเป็น Warm, Warm กับ Cool เป็นอุณหภูมิห้อง แผนใช้ประโยชน์จากจุดนี้ เช่น Heat Furnace โหมด Scorching ที่ห่างจาก Cooling Unit โหมด Cool สี่ช่อง จะครอบคลุมสามโซนพร้อมกัน คือ Scorching, Warm ตรงกลาง และ Cool ตำแหน่งของอาคารหลังที่สองเป็นตัวกำหนดการแบ่ง: ทุกตำแหน่งที่ยังซ้อนทับกับหลังแรกจะถูกคำนวณ ทั้งแนวตรงและแนวทแยง ตั้งแต่ชิดกัน (6, 24 ตรงกลาง และ 6 แปลงสำหรับ Farmland) ไปจนซ้อนกันเท่ามุมหนึ่ง (22, 10 และ 22) อาคารสองหลังที่ใกล้กันขนาดนี้ครอบคลุมแปลงรวมได้น้อยกว่าสองหลังที่ตั้งห่างกัน แผนจึงทำเช่นนี้เฉพาะเมื่อโซนที่สามคุ้มกว่า ให้วางคู่นี้ตามแผนภาพในแผนทุกประการ และอย่าให้พื้นที่ของอาคารอื่นทับ</p>
                <p>Cooling Unit มีขนาด 2×2 ช่อง ส่วน Heat Furnace และ Sunlamp ขนาดหนึ่งช่อง แต่ละอันครอบคลุมพื้นที่ 9×9 โดยมีตัวมันอยู่ตรงกลาง แปลงจะนับว่าถูกครอบคลุมถ้าส่วนใดส่วนหนึ่งอยู่ข้างใน และทุกอย่างจัดตำแหน่งทีละหนึ่งในสี่ช่อง ทุกวิธีที่อาคารหนึ่งหลังครอบคลุม Farmland, Woodland และอื่น ๆ ผสมกันจะถูกคำนวณครั้งเดียวด้วยการจัดวางแบบแม่นยำ จากนั้นแผนจะเลือกโหมดและหนึ่งในรูปแบบเหล่านั้นสำหรับแต่ละอาคาร</p>

                <h3>การเลื่อนระดับ</h3>
                <p>การเลื่อนระดับใช้ Home Coins \\(C_0\\) บวกวัสดุที่ต้องใช้ \\(C_1\\) และ \\(C_2\\) (Wood Blocks และ Mineral Sand ดิบจนถึง RV 6, ไอเท็มจาก Woodworking Bench และ Chimney Kiln ตั้งแต่ RV 7) และคุณอาจมีบางส่วนอยู่แล้ว \\(S_j\\) แผนจะหาจำนวนการเลื่อนระดับต่อวันที่มากที่สุด \\(\\lambda\\) ที่ทำได้ต่อเนื่อง โดยสำหรับ Home Coins และแต่ละไอเท็ม:</p>
                <div class="math-block">\\[ \\text{made}_j \\ \\ge\\ \\frac{\\lambda \\, (C_j - S_j)}{86400} \\]</div>
                <p>(\\(\\text{made}_j\\) ต่อวินาที) ดังนั้นการเลื่อนระดับใช้เวลา \\(1/\\lambda\\) วัน ของที่อยู่ขั้นต่ำกว่าในสายการผลิต (Wood Blocks, Mineral Sand หรือขั้นที่ต่ำกว่า) นับรวมในสิ่งที่ผลิตได้ เพราะ Bench และ Kiln แปรรูปขึ้นไปได้ จากนั้นแก้อีกสองรอบ โดยคงผลของรอบก่อนไว้: Home Coins มากที่สุดที่ความเร็วนั้น แล้วไอเท็มเลื่อนระดับเพิ่มเติมเท่าที่เวลาว่างของ Bench และ Kiln เอื้อ นี่คือเหตุที่แร่มักเสร็จก่อนไม้และกลายเป็นส่วนเกิน</p>
                <p>แต่ละขั้นใช้ 8 ชิ้นจากขั้นที่ต่ำกว่า (4 ชิ้นสำหรับขั้นสุดท้าย) Bench และ Kiln จึงสลับไปมาระหว่างขั้น แทนที่จะทำสูตรเดียวเหมือนเครื่องแปรรูปอื่น</p>

                <h3>ลำดับความสำคัญ</h3>
                <p>แผนจะแก้หนึ่งรอบต่อหนึ่งลำดับความสำคัญที่ติ๊กไว้ ตามลำดับของคุณ แต่ละรอบผลิตลำดับนั้นให้มากที่สุดโดยยังคงอย่างน้อยเท่าที่ลำดับก่อนหน้าทำได้ แล้วรอบสุดท้ายหา Home Coins ให้มากที่สุดเท่าที่เหลือที่ว่าง Aniimo EXP, Aniipods และในช่วง Harvest Moon Festival คือ Harvest Moon Points นับเป็นสกุลเงินของตัวเอง แบบจำลองเดียวกันจึงจัดการได้เหมือน Home Coins</p>

                <h3>เวลาที่ใช้ถึงเป้าหมาย</h3>
                <p>สินค้าแต่ละอย่างเริ่มสะสมเมื่อรอบแรกผ่านสายวัตถุดิบ (lead time) แล้วจึงผลิตที่อัตราคงที่:</p>
                <div class="math-block">\\[ \\text{amount}(t) = \\sum_i \\text{rate}_i \\cdot \\max(0,\\ t - \\text{lead}_i) \\]</div>
                <p>ค่านี้เพิ่มขึ้นตาม \\(t\\) เสมอ เวลาที่ใช้ถึงเป้าหมายจึงหาได้ด้วยการค้นหาแบบทวิภาค (binary search)</p>

                <h3>ตัววางแผนสำรอง</h3>
                <p>ถ้าตัววางแผนแบบแม่นยำทำงานไม่ได้ (เกิดขึ้นน้อย การโหลดหน้าใหม่มักแก้ได้) ตัววางแผนรุ่นเก่าจะเข้ามาทำแทน โดยแก้ปัญหาเดียวกันเป็นโปรแกรมเชิงเส้นแบบต่อเนื่อง ปัดเป็นแปลงเต็มและหนึ่งสูตรต่อเครื่อง แล้วแก้ซ้ำ แผนมักใกล้เคียงแผนที่ดีที่สุดแต่ไม่รับประกัน และผลลัพธ์จะบอกเมื่อมีการใช้ตัววางแผนนี้</p>
`,
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();

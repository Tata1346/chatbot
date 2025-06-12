const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
let isMusicPlaying = false;
const audio = document.getElementById("comfort-audio");

userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

let isFirstMessage = true;
let comfortMode = false;
let comfortIndex = 0;

const comfortData = [
    ["คุณยังคิดถึงเขาอยู่ไหม?", "มันไม่แปลกเลยถ้าคุณยังคิดถึงเขาอยู่ เพราะความทรงจำดี ๆ มักจะอยู่กับเรานานที่สุด ❤️"],
    ["ความรู้สึกตอนนี้ของคุณคืออะไร?", "การได้รู้สึกเจ็บปวด คือสัญญาณว่าคุณรักอย่างจริงใจ 💔"],
    ["คุณเคยร้องไห้กับเรื่องนี้หรือยัง?", "น้ำตาไม่ใช่ความอ่อนแอ แต่มันคือการเยียวยาจากหัวใจ 💧"],
    ["คุณเคยโทษตัวเองไหม?", "อย่าโทษตัวเองไปตลอด คุณทำดีที่สุดในแบบของคุณแล้ว ✨"],
    ["คุณเคยให้อภัยตัวเองหรือยัง?", "การให้อภัยตัวเอง คือจุดเริ่มต้นของการเริ่มใหม่ 🕊️"],
    ["คุณยังอยากให้เขากลับมาไหม?", "ความรู้สึกแบบนั้นเข้าใจได้ แต่อดีตไม่ใช่ที่ที่เราต้องอยู่ตลอดไป 🕰️"],
    ["คุณเคยพยายามลืมเขาไหม?", "การพยายามลืม คือการพยายามรักตัวเองมากขึ้นอีกนิด 💪"],
    ["มีเพลงไหนที่ทำให้คุณนึกถึงเขาไหม?", "เสียงเพลงคือสะพานของหัวใจ ฟังมัน แต่อย่าให้มันรั้งคุณไว้ 🎶"],
    ["คุณเคยเจอใครที่เข้าใจคุณในช่วงนี้ไหม?", "คุณไม่ได้อยู่คนเดียว ยังมีคนที่พร้อมอยู่ข้างคุณเสมอ 🤝"],
    ["คุณอยากกลับไปแก้ไขอะไรไหม?", "อดีตแก้ไม่ได้ แต่วันนี้คุณยังสร้างอนาคตใหม่ได้เสมอ 🌅"],
    ["คุณคิดว่าคุณไม่ดีพอหรือเปล่า?", "คุณมีคุณค่าในแบบของคุณ และสมควรได้รับรักดี ๆ 🪞"],
    ["คุณกลัวการเริ่มใหม่ไหม?", "การเริ่มใหม่อาจน่ากลัว แต่ก็คือโอกาสที่จะพบสิ่งที่ดีกว่า 💫"],
    ["คุณเคยเก็บของของเขาไว้ไหม?", "บางครั้งการปล่อยของเก่า คือการเปิดพื้นที่ให้สิ่งใหม่เข้ามา 📦"],
    ["คุณรู้สึกโดดเดี่ยวหรือเปล่า?", "ความโดดเดี่ยวจะไม่อยู่ตลอดไป เมื่อคุณเปิดใจรับคนใหม่ ๆ 🌻"],
    ["คุณเคยบอกลาเขาในใจหรือยัง?", "การบอกลาในใจ คือจุดเริ่มต้นของการเยียวยา 🫶"],
    ["คุณเคยโกรธเขาไหม?", "ความโกรธคือภาระ หากวางได้ ใจคุณจะเบาขึ้นมาก 💨"],
    ["คุณเคยให้อภัยเขาหรือยัง?", "การให้อภัยเขา คือการปลดปล่อยตัวเองออกจากอดีต 🔓"],
    ["คุณยังเชื่อในความรักอยู่ไหม?", "ความรักไม่ผิด คนที่ไม่เห็นค่าเราต่างหากที่ไม่ใช่ 💔"],
    ["คุณอยากพูดอะไรกับเขาถ้าคุยได้อีกครั้ง?", "เก็บคำพูดนั้นไว้ แล้วใช้มันเป็นบทเรียนสำหรับอนาคต 🎓"],
    ["คุณยังฝันถึงเขาอยู่ไหม?", "ฝันคือสิ่งที่ใจยังเก็บไว้ แต่เวลาจะค่อย ๆ ลบเลือนฝันนั้นเอง ⏳"],
    ["อะไรที่ทำให้คุณเศร้าที่สุดจากเรื่องนี้?", "ความเศร้าคือครู มันสอนให้เราเข้มแข็งขึ้นทุกครั้งที่ผ่านไป 📘"],
    ["คุณเคยยิ้มเพราะเขาไหม?", "อย่าเสียดายรอยยิ้ม เพราะวันหนึ่งคุณจะยิ้มได้อีกครั้ง 🌈"],
    ["คุณรู้สึกว่าเขารักคุณจริงไหม?", "คำตอบนั้นอาจไม่แน่ชัด แต่ที่แน่ ๆ คือคุณรักตัวเองได้เสมอ 💖"],
    ["คุณเคยคิดถึงอนาคตกับเขาไหม?", "ฝันนั้นอาจไม่เป็นจริง แต่คุณยังสร้างฝันใหม่ได้ 🎯"],
    ["คุณรู้สึกว่าความรักมันยุติธรรมหรือเปล่า?", "ความรักไม่ยุติธรรมเสมอ แต่เรายังเลือกเดินทางของตัวเองได้ 🛤️"],
    ["คุณเคยมีความสุขจริง ๆ กับเขาไหม?", "จงขอบคุณช่วงเวลาดี ๆ และเก็บมันไว้เป็นพลังในวันใหม่ ☀️"],
    ["อะไรคือบทเรียนจากความรักครั้งนี้?", "บทเรียนในความรัก จะเป็นเกราะให้คุณรักอย่างมั่นคงขึ้นในครั้งหน้า 📖"],
    ["คุณอยากให้ตัวเองเป็นคนแบบไหนในอนาคต?", "จงเป็นคนที่คุณอยากให้รักคุณ – จริงใจ เข้มแข็ง และไม่ยอมแพ้ 💡"],
    ["วันนี้คุณรู้สึกดีขึ้นกว่าเมื่อวานไหม?", "แม้เพียงนิดเดียว ก็คือความก้าวหน้า 💚"],
    ["คุณพร้อมจะเปิดใจอีกครั้งหรือยัง?", "อย่าเร่งรีบ แต่จงเชื่อว่าความรักครั้งใหม่จะดีกว่าเดิมเสมอ 🌷"]
];

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage("คุณ", message);
    userInput.value = "";
    userInput.focus();

    if (isFirstMessage) {
        botGreeting();
        isFirstMessage = false;
    } else if (comfortMode) {
        handleComfortAnswer(message);
    } else {
        getBotReply(message);
    }
}

function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function botGreeting() {
    const greeting = "สวัสดีครับ! ยินดีที่ได้พบคุณ<br>พิมพ์เลขเพื่อเลือกสิ่งที่ต้องการ:<br>" +
        "1️⃣ คิดเลข<br>" +
        "2️⃣ เข้าสู่หน้าเกม<br>" +
        "3️⃣ ฟังเพลง<br>" +
        "4️⃣ ช่วยปลอบ (อกหัก 💔)";
    setTimeout(() => {
        chatBox.innerHTML = "";
        appendMessage("บอท", greeting);
    }, 300);
}

function getBotReply(userMsg) {
    chatBox.innerHTML = "";

    let reply = "ขอโทษครับ ฉันไม่เข้าใจคำสั่งนั้น กรุณาลองใหม่อีกครั้ง";

    if (userMsg === "1") userMsg = "คิดเลข";
    else if (userMsg === "2") userMsg = "เข้าสู่หน้าเกม";
    else if (userMsg === "3") userMsg = "ฟังเพลง";
    else if (userMsg === "4") userMsg = "ช่วยปลอบ";

    if (userMsg.includes("คิดเลข")) {
        reply = "กรุณาพิมพ์สมการคณิตศาสตร์ (เช่น 3+4*2) แล้วฉันจะคำนวณให้";
    } else if (isValidExpression(userMsg)) {
        try {
            let result = eval(userMsg);
            reply = `ผลลัพธ์ของ ${userMsg} คือ ${result}`;
        } catch {
            reply = "ไม่สามารถคำนวณสมการนี้ได้ครับ กรุณาตรวจสอบใหม่";
        }
    } else if (userMsg.includes("เข้าสู่หน้าเกม")) {
        reply = 'กรุณาคลิก <a href="game/game.html" style="color:#0a84ff;">ที่นี่</a> เพื่อเข้าสู่หน้าเกม';
    } else if (userMsg.includes("ฟังเพลง")) {
        reply = 'ลองฟังเพลงดี ๆ ได้ที่ <a href="https://www.youtube.com" target="_blank" style="color:#0a84ff;">ลิงก์นี้</a>';
    } else if (userMsg.includes("ช่วยปลอบ")) {
        comfortMode = true;
        comfortIndex = 0;
        playComfortMusic();
        reply = comfortData[comfortIndex][0];
    }

    setTimeout(() => appendMessage("บอท", reply), 500);
}

function handleComfortAnswer(userMsg) {
    chatBox.innerHTML = "";

    const reply = comfortData[comfortIndex][1];
    appendMessage("บอท", reply);

    userInput.value = "";
    userInput.focus();

    comfortIndex++;
    if (comfortIndex >= comfortData.length) {
        comfortMode = false;
        comfortIndex = 0;
        setTimeout(() => botGreeting(), 1500);
    } else {
        setTimeout(() => appendMessage("บอท", comfortData[comfortIndex][0]), 1500);
    }
}

function isValidExpression(expr) {
    const regex = /^[0-9+\-*/().\s]+$/;
    return regex.test(expr);
}

function showTempMessage(text) {
    const temp = document.createElement("div");
    temp.innerHTML = `<strong>บอท:</strong> ${text}`;
    temp.style.opacity = "0.8";
    temp.style.marginTop = "10px";
    chatBox.appendChild(temp);
    chatBox.scrollTop = chatBox.scrollHeight;
    setTimeout(() => temp.remove(), 2000);
}


function stopComfortMusic() {
    if (isMusicPlaying) {
        audio.pause();
        isMusicPlaying = false;
        showTempMessage("⏹ เพลงถูกหยุดเรียบร้อยแล้ว");
    }
}

function playComfortMusic() {
    audio.play().then(() => {
        isMusicPlaying = true;
        showTempMessage("▶️ เริ่มเล่นเพลงปลอบใจแล้ว");
    });

}
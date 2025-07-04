// Sample student data (in real application, this would come from a backend database)
const studentData = {
    "256112515": {
        name: "وضحاء غازي بنيه الحربي",
        degree: "دبلوم",
        major: "الإدارة العامة",
        status: "مقبولة",
        admissionDate: "2025/07/04",
        phone: "0501234567",
        fees: {
            tuition: 2000,
            registration: 500,
            total: 2500
        }
    }
};

let currentStudent = null;

// Utility function to hide all forms and results
function hideAllForms() {
    document.getElementById("forms-section").classList.add("hidden");
    document.getElementById("results-section").classList.add("hidden");
    document.getElementById("inquiry-form").classList.add("hidden");
    // document.getElementById("confirmation-form").classList.add("hidden"); // Not used in this simplified flow
    // document.getElementById("payment-form").classList.add("hidden"); // Not used in this simplified flow
}

// Utility function to scroll to an element
function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
}

// Show inquiry form (initial state)
function showInquiryForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");
    document.getElementById("inquiry-form").classList.remove("hidden");
    document.getElementById("inquiry-id").value = "";
    document.getElementById("inquiry-phone").value = "";
    scrollToElement("forms-section");

    // Enable only inquiry card
    document.getElementById("inquiry-card").querySelector(".submit-btn").onclick = showInquiryForm;
    document.getElementById("confirmation-card").querySelector(".submit-btn").onclick = () => alert("يرجى البدء بالاستعلام عن القبول أولاً");
    document.getElementById("payment-card").querySelector(".submit-btn").onclick = () => alert("يرجى البدء بالاستعلام عن القبول أولاً");
}

// Check admission status
function checkAdmission() {
    const id = document.getElementById("inquiry-id").value;
    const phone = document.getElementById("inquiry-phone").value;

    if (!id || !phone) {
        alert("الرجاء إدخال رقم الطلب ورقم الجوال.");
        return;
    }

    if (studentData[id] && studentData[id].phone === phone) {
        currentStudent = studentData[id];
        showAdmissionResult();
    } else {
        alert("عذراً، لا توجد بيانات قبول مطابقة.");
    }
}

// Show admission result
function showAdmissionResult() {
    hideAllForms();
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>تم قبولك بنجاح!</h3>
                <p class="status-accepted">مبروك! تم قبولك في الجامعة</p>
            </div>
            <div class="student-info">
                <div class="info-item">
                    <label>الاسم:</label>
                    <span>${currentStudent.name}</span>
                </div>
                <div class="info-item">
                    <label>الدرجة العلمية:</label>
                    <span>${currentStudent.degree}</span>
                </div>
                <div class="info-item">
                    <label>التخصص:</label>
                    <span>${currentStudent.major}</span>
                </div>
                <div class="info-item">
                    <label>حالة القبول:</label>
                    <span>${currentStudent.status}</span>
                </div>
                <div class="info-item">
                    <label>تاريخ القبول:</label>
                    <span>${currentStudent.admissionDate}</span>
                </div>
            </div>
            <button class="submit-btn" onclick="showConfirmationSuccess()">تأكيد القبول</button>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");

    // Update card buttons
    document.getElementById("inquiry-card").querySelector(".submit-btn").onclick = () => alert("لقد استعلمت بالفعل عن القبول.");
    document.getElementById("confirmation-card").querySelector(".submit-btn").onclick = showConfirmationSuccess;
    document.getElementById("payment-card").querySelector(".submit-btn").onclick = () => alert("يرجى تأكيد القبول أولاً");
}

// Show confirmation success (simplified, no password needed)
function showConfirmationSuccess() {
    hideAllForms();
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>تم تأكيد قبولك بنجاح!</h3>
                <p class="status-accepted">مبروك! تم تأكيد قبولك في الجامعة</p>
            </div>
            <div class="student-info">
                <div class="info-item">
                    <label>الاسم:</label>
                    <span>${currentStudent.name}</span>
                </div>
                <div class="info-item">
                    <label>الدرجة العلمية:</label>
                    <span>${currentStudent.degree}</span>
                </div>
                <div class="info-item">
                    <label>التخصص:</label>
                    <span>${currentStudent.major}</span>
                </div>
            </div>
            <button class="submit-btn" onclick="showPaymentInvoice()">السداد</button>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");

    // Update card buttons
    document.getElementById("inquiry-card").querySelector(".submit-btn").onclick = () => alert("لقد استعلمت بالفعل عن القبول.");
    document.getElementById("confirmation-card").querySelector(".submit-btn").onclick = () => alert("لقد أكدت قبولك بالفعل.");
    document.getElementById("payment-card").querySelector(".submit-btn").onclick = showPaymentInvoice;
}

// Show payment invoice directly
function showPaymentInvoice() {
    hideAllForms();
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>فاتورة السداد</h3>
                <p>الرجاء سداد الرسوم المستحقة لإتمام التسجيل</p>
            </div>
            <div class="student-info">
                <div class="info-item">
                    <label>الطالبة:</label>
                    <span>${currentStudent.name}</span>
                </div>
                <div class="info-item">
                    <label>التخصص:</label>
                    <span>${currentStudent.major}</span>
                </div>
            </div>
            <div class="payment-invoice">
                <div class="invoice-header">
                    <h4>تفاصيل الرسوم</h4>
                </div>
                <div class="invoice-details">
                    <div class="invoice-item">
                        <span>بقية رسوم التسجيل:</span>
                        <span>500 ريال</span>
                    </div>
                    <div class="invoice-item">
                        <span>قسط الرسوم الدراسية:</span>
                        <span>2000 ريال</span>
                    </div>
                </div>
                <div class="invoice-total">
                    <p>المجموع الكلي</p>
                    <p class="total-amount">2500 ريال سعودي</p>
                </div>
            </div>

            <div class="bank-info">
                <h5>معلومات التحويل البنكي</h5>
                <div class="bank-details">
                    <div class="bank-item">
                        <span>اسم البنك:</span>
                        <span>البنك  الراجحي</span>
                    </div>
                    <div class="bank-item">
                        <span>رقم الحساب:</span>
                        <span>141608016024333</span>
                    </div>
                </div>
            </div>

            <div class="upload-section">
                <h5>رفع إيصال السداد</h5>
                <div class="upload-area" onclick="document.getElementById('receipt-upload').click()">
                    <input type="file" id="receipt-upload" accept=".pdf,.jpg,.png" onchange="displayFileName()">
                    <div class="upload-icon">📄</div>
                    <p>اضغط هنا لرفع إيصال السداد</p>
                    <p style="font-size: 14px; color: #999;">الملفات المدعومة: PDF, JPG, PNG (حد أقصى 5 ميجابايت)</p>
                    <p id="file-name" style="font-size: 16px; color: #1a5f3f; font-weight: bold; margin-top: 10px;"></p>
                </div>
                <button class="submit-btn mt-20 payment-btn" onclick="submitPayment()">إرسال إيصال السداد</button>
            </div>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");

    // Update card buttons
    document.getElementById("inquiry-card").querySelector(".submit-btn").onclick = () => alert("لقد استعلمت بالفعل عن القبول.");
    document.getElementById("confirmation-card").querySelector(".submit-btn").onclick = () => alert("لقد أكدت قبولك بالفعل.");
    document.getElementById("payment-card").querySelector(".submit-btn").onclick = showPaymentInvoice;
}

// Display selected file name
function displayFileName() {
    const fileInput = document.getElementById("receipt-upload");
    const fileNameDisplay = document.getElementById("file-name");
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = `الملف المحدد: ${fileInput.files[0].name}`;
    } else {
        fileNameDisplay.textContent = "";
    }
}

// Simulate payment submission (no backend interaction)
function submitPayment() {
    const fileInput = document.getElementById("receipt-upload");
    
    if (!fileInput.files[0]) {
        alert("يرجى رفع إيصال السداد أولاً");
        return;
    }
    
    // Simulate submission success after a delay
    setTimeout(() => {
        showPaymentSuccess();
    }, 1500);
}

// Show payment success message
function showPaymentSuccess(referenceNumber = null) {
    hideAllForms();
    
    const refNum = referenceNumber || `KFU-${Date.now()}`;
    
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>تم إرسال إيصال السداد بنجاح!</h3>
                <p class="status-accepted">شكراً لك! سيتم مراجعة إيصال السداد خلال 24 ساعة</p>
            </div>
            <div style="background: rgba(39, 174, 96, 0.1); padding: 20px; border-radius: 15px; text-align: center; margin: 20px 0;">
                <h4 style="color: #27ae60; margin-bottom: 15px;">تم استلام إيصال السداد</h4>
                <p style="color: #333; margin-bottom: 10px;">رقم المرجع: ${refNum}</p>
                <p style="color: #666; font-size: 14px;">
                    يرجى الاحتفاظ برقم المرجع للمتابعة
                </p>
            </div>
            <div class="student-info">
                <div class="info-item">
                    <label>الاسم:</label>
                    <span>${currentStudent.name}</span>
                </div>
                <div class="info-item">
                    <label>المبلغ المدفوع:</label>
                    <span>${currentStudent.fees.total} ريال سعودي</span>
                </div>
                <div class="info-item">
                    <label>تاريخ الإرسال:</label>
                    <span>${new Date().toLocaleDateString("ar-SA")}</span>
                </div>
            </div>
            <div class="text-center mt-20">
                <button class="submit-btn" onclick="goHome()" style="width: auto; padding: 15px 40px;">
                    العودة للرئيسية
                </button>
            </div>
        </div>
    `;
    
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
}

// Go back to home
function goHome() {
    hideAllForms();
    currentStudent = null; // Clear current student data
    // Reset card buttons to initial state
    document.getElementById("inquiry-card").querySelector(".submit-btn").onclick = showInquiryForm;
    document.getElementById("confirmation-card").querySelector(".submit-btn").onclick = () => alert("يرجى البدء بالاستعلام عن القبول أولاً");
    document.getElementById("payment-card").querySelector(".submit-btn").onclick = () => alert("يرجى البدء بالاستعلام عن القبول أولاً");
    scrollToElement("hero");
}

// Add smooth scrolling for all internal links
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Initialize the page by showing the inquiry form or main services
document.addEventListener("DOMContentLoaded", () => {
    // Initially, only the service cards are visible, forms are hidden
    hideAllForms();
});


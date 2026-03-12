/* ========================================================= */
/*                                                            */
/*     نظام واجهة منصة تيرا الاحترافي - ملف JS المنفصل        */
/*              (التحكم الكامل في القوائم والتفاعلات)         */
/*                                                            */
/* ========================================================= */

(function() {
    'use strict';

    // ----------------------------------- //
    // بداية: تهيئة المتغيرات العامة       //
    // ----------------------------------- //
    const TERA = {
        // العناصر الرئيسية
        header: null,
        menuToggle: null,
        sidebar: null,
        overlay: null,
        closeBtn: null,
        submenuItems: [],
        
        // الحالة
        isSidebarOpen: false,
        isTransitioning: false,
        
        // الإعدادات
        settings: {
            closeOnOverlayClick: true,
            closeOnEscape: true,
            preventBodyScroll: true,
            submenuToggleOnClick: true
        }
    };
    // ----------------------------------- //
    // نهاية: تهيئة المتغيرات العامة       //
    // ----------------------------------- //

    // ----------------------------------- //
    // بداية: تهيئة النظام والبحث عن العناصر //
    // ----------------------------------- //
    function initTeraUI() {
        // البحث عن العناصر المطلوبة
        TERA.menuToggle = document.querySelector('.tera-menu-toggle');
        TERA.sidebar = document.querySelector('.tera-sidebar');
        TERA.overlay = document.querySelector('.tera-overlay');
        TERA.closeBtn = document.querySelector('.tera-close-btn');
        
        // التحقق من وجود العناصر الأساسية
        if (!TERA.menuToggle || !TERA.sidebar) {
            console.warn('TERA UI: بعض العناصر الأساسية غير موجودة');
            return;
        }
        
        // البحث عن القوائم الفرعية
        TERA.submenuItems = document.querySelectorAll('.tera-has-submenu');
        
        // بدء الاستماع للأحداث
        bindEvents();
        
        console.log('TERA UI: تم التهيئة بنجاح');
    }
    // ----------------------------------- //
    // نهاية: تهيئة النظام والبحث عن العناصر //
    // ----------------------------------- //

    // ----------------------------------- //
    // بداية: ربط الأحداث بالعناصر          //
    // ----------------------------------- //
    function bindEvents() {
        // حدث زر القائمة
        if (TERA.menuToggle) {
            TERA.menuToggle.addEventListener('click', toggleSidebar);
        }
        
        // حدث زر الإغلاق
        if (TERA.closeBtn) {
            TERA.closeBtn.addEventListener('click', closeSidebar);
        }
        
        // حدث طبقة التعتيم
        if (TERA.overlay && TERA.settings.closeOnOverlayClick) {
            TERA.overlay.addEventListener('click', closeSidebar);
        }
        
        // حدث الضغط على Escape
        if (TERA.settings.closeOnEscape) {
            document.addEventListener('keydown', handleEscapeKey);
        }
        
        // أحداث القوائم الفرعية
        TERA.submenuItems.forEach(item => {
            const trigger = item.querySelector('.tera-menu-link, .tera-menu-item');
            if (trigger) {
                trigger.addEventListener('click', (e) => toggleSubmenu(e, item));
            }
        });
        
        // أحداث النافذة (resize)
        window.addEventListener('resize', handleResize);
        
        // منع انتشار الأحداث من داخل السايدبار
        if (TERA.sidebar) {
            TERA.sidebar.addEventListener('click', (e) => e.stopPropagation());
        }
    }
    // ----------------------------------- //
    // نهاية: ربط الأحداث بالعناصر          //
    // ----------------------------------- //

    // ----------------------------------- //
    // بداية: فتح وإغلاق السايدبار          //
    // ----------------------------------- //
    function toggleSidebar() {
        if (TERA.isSidebarOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
    
    function openSidebar() {
        if (TERA.isTransitioning || TERA.isSidebarOpen) return;
        
        TERA.isTransitioning = true;
        
        // إضافة الكلاسات المطلوبة
        TERA.menuToggle?.classList.add('active');
        TERA.sidebar?.classList.add('active');
        TERA.overlay?.classList.add('active');
        
        // منع تمرير الصفحة
        if (TERA.settings.preventBodyScroll) {
            document.body.classList.add('sidebar-open');
        }
        
        TERA.isSidebarOpen = true;
        
        // إنهاء حالة الانتقال بعد انتهاء الأنيميشن
        setTimeout(() => {
            TERA.isTransitioning = false;
        }, 450);
        
        // حدث مخصص - تم فتح السايدبار
        document.dispatchEvent(new CustomEvent('tera:sidebarOpened'));
    }
    
    function closeSidebar() {
        if (TERA.isTransitioning || !TERA.isSidebarOpen) return;
        
        TERA.isTransitioning = true;
        
        // إزالة الكلاسات
        TERA.menuToggle?.classList.remove('active');
        TERA.sidebar?.classList.remove('active');
        TERA.overlay?.classList.remove('active');
        
        // السماح بتمرير الصفحة
        if (TERA.settings.preventBodyScroll) {
            document.body.classList.remove('sidebar-open');
        }
        
        TERA.isSidebarOpen = false;
        
        // إنهاء حالة الانتقال بعد انتهاء الأنيميشن
        setTimeout(() => {
            TERA.isTransitioning = false;
        }, 450);
        
        // إغلاق جميع القوائم الفرعية
        closeAllSubmenus();
        
        // حدث مخصص - تم إغلاق السايدبار
        document.dispatchEvent(new CustomEvent('tera:sidebarClosed'));
    }
    // ----------------------------------- //
    // نهاية: فتح وإغلاق السايدبار          //
    // ----------------------------------- //

    // ----------------------------------- //
    // بداية: التحكم في القوائم الفرعية     //
    // ----------------------------------- //
    function toggleSubmenu(event, submenuItem) {
        event.preventDefault();
        event.stopPropagation();
        
        // التحقق مما إذا كان العنصر يحتوي على القائمة الفرعية
        const submenu = submenuItem.querySelector('.tera-submenu');
        if (!submenu) return;
        
        // تبديل حالة القائمة الفرعية
        submenuItem.classList.toggle('active');
        
        // حدث مخصص - تم تغيير حالة القائمة الفرعية
        document.dispatchEvent(new CustomEvent('tera:submenuToggled', {
            detail: { item: submenuItem, isOpen: submenuItem.classList.contains('active') }
        }));
    }
    
    function closeAllSubmenus() {
        TERA.submenuItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    // ----------------------------------- //
    // نهاية: التحكم في القوائم الفرعية     //
    // ----------------------------------- //

    // ----------------------------------- //
    // بداية: معالجة الأحداث العامة         //
    // ----------------------------------- //
    function handleEscapeKey(e) {
        if (e.key === 'Escape' && TERA.isSidebarOpen) {
            closeSidebar();
        }
    }
    
    function handleResize() {
        // يمكن إضافة منطق معين عند تغيير حجم الشاشة
    }
    // ----------------------------------- //
    // نهاية: معالجة الأحداث العامة         //
    // ----------------------------------- //

    // ----------------------------------- //
    // بداية: دوال مساعدة للاستخدام الخارجي //
    // ----------------------------------- //
    window.TERA = {
        // دوال التحكم في السايدبار
        openSidebar: openSidebar,
        closeSidebar: closeSidebar,
        toggleSidebar: toggleSidebar,
        
        // دوال التحكم في القوائم الفرعية
        closeAllSubmenus: closeAllSubmenus,
        
        // معلومات الحالة
        isOpen: () => TERA.isSidebarOpen,
        
        // تحديث الإعدادات
        updateSettings: (newSettings) => {
            Object.assign(TERA.settings, newSettings);
        },
        
        // إعادة تهيئة النظام
        reinit: () => {
            // إعادة البحث عن العناصر
            TERA.menuToggle = document.querySelector('.tera-menu-toggle');
            TERA.sidebar = document.querySelector('.tera-sidebar');
            TERA.overlay = document.querySelector('.tera-overlay');
            TERA.closeBtn = document.querySelector('.tera-close-btn');
            TERA.submenuItems = document.querySelectorAll('.tera-has-submenu');
            
            console.log('TERA UI: تمت إعادة التهيئة');
        }
    };
    // ----------------------------------- //
    // نهاية: دوال مساعدة للاستخدام الخارجي //
    // ----------------------------------- //

    // ----------------------------------- //
    // بداية: تشغيل النظام عند تحميل الصفحة //
    // ----------------------------------- //
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTeraUI);
    } else {
        // إذا كانت الصفحة قد حمّلت بالفعل
        initTeraUI();
    }
    // ----------------------------------- //
    // نهاية: تشغيل النظام عند تحميل الصفحة //
    // ----------------------------------- //

})();

/* ========================================================= */
/*                                                            */
/*              نهاية ملف JavaScript - TERA UI                */
/*                                                            */
/* ========================================================= */

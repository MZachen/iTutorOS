// @ts-nocheck
"use client";

import {
  AlignHorizontalCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ColorPickerIcon,
  CursorPointer01Icon,
  CursorTextIcon,
  Image01Icon,
  Layers01Icon,
  LockIcon,
  RedoIcon,
  StrokeCenterIcon,
  StrokeInsideIcon,
  StrokeOutsideIcon,
  UndoIcon,
  UserUnlock01Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";

export type SettingsContentAndMarketingTabProps = {
  ctx: Record<string, any>;
};

export default function SettingsContentAndMarketingTab({ ctx }: SettingsContentAndMarketingTabProps) {
  const {
    accountForm,
    accountInitial,
    activeEmailInboxes,
    activeLeadCount,
    activeLocations,
    activeTab,
    activeTutorCount,
    addCatalogMedia,
    addEmailInbox,
    addRoom,
    addService,
    addSubject,
    addTopic,
    aiRewriteLoading,
    aiRewrites,
    ALL_TABS,
    anyDirty,
    anyDirtyRef,
    AppHeader,
    ARCHIVE_LABELS,
    ARCHIVE_OPTIONS,
    archiveEdits,
    archiveEditsForType,
    archiveEmailInbox,
    archiveHasChanges,
    ArchiveIcon,
    archiveLocation,
    archiveMaps,
    archiveRoom,
    archiveRows,
    archiveSort,
    archiveTutor,
    archiveType,
    ArrowDown01Icon,
    ArrowUp01Icon,
    billableLocations,
    BookOpen01Icon,
    bufferDraft,
    Building04Icon,
    buildProductDraft,
    buildSubjectDrafts,
    businessForm,
    businessInitial,
    Calendar01Icon,
    canAddLocation,
    canAddTutor,
    Cancel01Icon,
    cancelEditLocation,
    cancelEditRoom,
    catalogMediaByKey,
    catalogMediaKey,
    catalogMediaLoading,
    centsToDollars,
    CheckmarkCircle01Icon,
    checkoutHref,
    checkoutHrefFor,
    childPrompt,
    childPromptResolverRef,
    ClampedCell,
    clearAiRewrite,
    clearSocialBuilder,
    CLIENT_FIELDS_STORAGE_KEY,
    clientsForm,
    closeChildUnarchivePrompt,
    closePasswordPrompt,
    companyDirty,
    companyDraft,
    confirmWithPassword,
    connectGoogleInbox,
    CONNECTION_PROVIDERS,
    connectionCardGradient,
    connections,
    connectionsDirty,
    connectionSnapshots,
    connectionStatusById,
    connectionStatusLabel,
    CONTENT_STUDIO_TABS,
    Copy01Icon,
    CreditCardIcon,
    DATE_FORMAT_OPTIONS,
    dateFormat,
    DEFAULT_DATE_FORMAT,
    DEFAULT_SERVICE_NAMES,
    DEFAULT_SUBJECTS,
    DEFAULT_TUTOR_COLOR,
    defaultClientFieldPrefs,
    defaultPipelineSources,
    dirtyTabs,
    discardActive,
    discardSocialCopy,
    dollarsToCents,
    dynamic,
    editLocationDraft,
    editLocationId,
    editRoomDraft,
    editRoomId,
    emailInboxes,
    EMPTY_PRODUCT_DRAFT,
    EMPTY_SOCIAL_DRAFT,
    formatCurrencyFromCents,
    formatDateWithPattern,
    formatPlanLimit,
    Fragment,
    generateSocialCopy,
    generateSocialImage,
    getConnectionProvider,
    getNewRoomDraft,
    getSupabaseBrowserClient,
    handleMediaFileUpload,
    handleSocialTemplateUpload,
    HugeiconsIcon,
    Input,
    isTutorOnly,
    Label,
    LazySettingsTabPanels,
    leadDisplayName,
    leadLimit,
    leads,
    Link01Icon,
    loadCatalogMedia,
    loading,
    loadPipelineSources,
    Location01Icon,
    locationNameById,
    locations,
    locLimit,
    makeEmailSource,
    makeUniqueServiceCode,
    MARKETING_SECTIONS,
    MarketingIcon,
    marketingSection,
    marketingServiceByCode,
    marketingServices,
    marketingSubjectId,
    marketingTab,
    me,
    mediaUrlDrafts,
    mergeEmailInboxSources,
    newEmailInbox,
    newRoomDrafts,
    newService,
    newSubjectName,
    newTopicDrafts,
    newTutor,
    normalizeClientFieldPrefs,
    normalizeDateFormat,
    normalizeKey,
    normalizePlanKey,
    onSave,
    openBillingPortal,
    openChildUnarchivePrompt,
    openPasswordPrompt,
    org,
    otherPlans,
    PackageIcon,
    PARENT_FIELDS,
    parentDisplayName,
    parentNameById,
    parents,
    parseNonNegativeInt,
    passwordDraft,
    passwordPrompt,
    passwordPromptResolverRef,
    patchEmailInbox,
    pipelineForm,
    PipelineIcon,
    plan,
    PLAN_ORDER,
    planCardColor,
    planKey,
    planLabel,
    planLeadLimit,
    planLocationLimit,
    planSpecs,
    planSpecsFor,
    planTutorLimit,
    productAutoSelectedRef,
    productDirty,
    productDraft,
    productDraftInitial,
    productMedia,
    productMediaKey,
    productMediaLoading,
    products,
    productTopicOptions,
    providerLabel,
    queryHandledRef,
    readFileAsDataUrl,
    removeCatalogMedia,
    removePipelineSource,
    removeSocialTemplate,
    renderSortIcons,
    rewriteWithAi,
    roomsByLocation,
    router,
    saveAccount,
    saveAllConnections,
    saveBusiness,
    saveClientFieldPrefs,
    saveClientFields,
    saveCompanyContent,
    saveConnection,
    saveEditLocation,
    saveEditRoom,
    savePipelineSettings,
    savePipelineSources,
    saveProducts,
    saveSchedule,
    saveServiceDescription,
    saveServices,
    saveSocialPost,
    saveSubjectDescription,
    saveSubjectsTopics,
    saveTopicDescription,
    saveTutors,
    scheduleForm,
    scheduleInitial,
    searchParams,
    selectedCarouselPresetId,
    selectedProductService,
    selectedServiceLocationId,
    selectProduct,
    sendResetEmail,
    serviceById,
    serviceCatalogDrafts,
    serviceDescriptionDrafts,
    serviceEdits,
    ServiceIcon,
    serviceLocationId,
    serviceLogoDrafts,
    serviceRows,
    servicesByLocation,
    serviceSort,
    setActiveTab,
    setAiLoading,
    setAiRewrite,
    setAiRewriteLoading,
    setAiRewrites,
    setArchiveEdits,
    setArchiveSort,
    setArchiveType,
    setBufferDraft,
    setCatalogMediaByKey,
    setCatalogMediaLoading,
    setChildPrompt,
    setCompanyDraft,
    setConnections,
    setConnectionSnapshots,
    setEditLocationDraft,
    setEditLocationId,
    setEditRoomDraft,
    setEditRoomId,
    setEmailInboxes,
    setLeads,
    setLoading,
    setLocations,
    setMarketingSection,
    setMarketingSubjectId,
    setMarketingTab,
    setMe,
    setMediaUrlDrafts,
    setNewEmailInbox,
    setNewRoomDrafts,
    setNewService,
    setNewSubjectName,
    setNewTopicDrafts,
    setNewTutor,
    setOrg,
    setParents,
    setPasswordDraft,
    setPasswordPrompt,
    setProductDraft,
    setProductDraftInitial,
    setProducts,
    setRoomsByLocation,
    setServiceCatalogDrafts,
    setServiceDescriptionDrafts,
    setServiceEdits,
    setServiceLocationId,
    setServiceLogoDrafts,
    setServicesByLocation,
    setServiceSort,
    setSocialDraft,
    setSocialSourceType,
    setSocialSourceTypeSelection,
    setSocialTemplates,
    setStatus,
    setStudents,
    setSubjectDescriptionDrafts,
    setSubjectDrafts,
    setSubjectDraftsInitialKey,
    setSubjects,
    setSubjectSort,
    SETTINGS_TAB_ICON_COLORS,
    SettingsPage,
    setToken,
    setTopicDescriptionDrafts,
    setTopicsBySubject,
    setTutorDrafts,
    setTutors,
    setUserEmail,
    SOCIAL_ASPECT_RATIO_FILE_KEYS,
    SOCIAL_ASPECT_RATIOS,
    SOCIAL_DRAFT_STORAGE_KEY,
    SOCIAL_LAYOUT_PRESET_FILE_KEYS,
    SOCIAL_LAYOUT_PRESETS,
    SOCIAL_PLATFORM_SPECS,
    SOCIAL_PRESET_CAROUSEL_ITEMS,
    SOCIAL_TEMPLATE_STYLES,
    socialAspect,
    socialDraft,
    socialMediaOptions,
    socialPresetCarouselRef,
    socialPresetRefs,
    socialPreviewMedia,
    socialSelectedProduct,
    socialSelectedService,
    socialSelectedSubject,
    socialSelectedTemplate,
    socialSelectedTopic,
    socialSourceType,
    socialTemplates,
    socialTopicOptions,
    sortedArchiveRows,
    sortedServiceRows,
    sortedSubjectDrafts,
    startConnectionOAuth,
    startEditLocation,
    startEditRoom,
    status,
    STUDENT_FIELDS,
    studentDisplayName,
    students,
    studentsByParentId,
    subjectBaselineMap,
    subjectDescriptionDrafts,
    subjectDrafts,
    subjectDraftsInitialKey,
    subjectDraftsInitialRef,
    subjectDraftsKey,
    subjectNameById,
    subjects,
    subjectSort,
    supabase,
    switchTab,
    TAB_DIVIDERS,
    TAB_HEADINGS,
    tabs,
    Textarea,
    timezones,
    toggleArchiveSort,
    toggleServiceSort,
    toggleSocialMedia,
    toggleSocialPlatform,
    toggleSubjectSort,
    token,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    topicDescriptionDrafts,
    topicsBySubject,
    tutorDrafts,
    tutorDraftsInitialRef,
    tutorLimit,
    tutors,
    UNIT_LENGTH_TOOLTIP,
    updateArchive,
    updateArchiveDraft,
    updateClientField,
    updateConnectionField,
    updateNewRoomDraft,
    updatePipelineSource,
    updateServiceDraft,
    US_STATES,
    usageColorClass,
    useEffect,
    useMemo,
    useRef,
    userEmail,
    UserGroupIcon,
    useRouter,
    useSearchParams,
    useSettingsForm,
    useState,
    WebDesign01Icon
  } = ctx;

  const GLOBAL_LIBRARY_ID = "__GLOBAL_LIBRARY__";
  const imageLibraryKey = catalogMediaKey("product", GLOBAL_LIBRARY_ID);
  const imageLibraryAll = catalogMediaByKey[imageLibraryKey] ?? [];
  const [imageLibraryPerPage, setImageLibraryPerPage] = useState(24);
  const [imageLibraryPage, setImageLibraryPage] = useState(1);
  const [imageLibraryUrlDraft, setImageLibraryUrlDraft] = useState("");
  const [socialToolTarget, setSocialToolTarget] = useState("headline");
  const [socialToolColor, setSocialToolColor] = useState("#ffffff");
  const [socialToolFontSize, setSocialToolFontSize] = useState(48);
  const [socialTextFontSizes, setSocialTextFontSizes] = useState({
    headline: 48,
    start: 30,
    cta: 75,
  });
  const [socialTextColors, setSocialTextColors] = useState<Record<string, string>>({});
  const [socialToolAlignX, setSocialToolAlignX] = useState("center");
  const [socialToolAlignY, setSocialToolAlignY] = useState("center");
  const [socialToolOutlineColor, setSocialToolOutlineColor] =
    useState("#000000");
  const [socialToolOutlineWidth, setSocialToolOutlineWidth] = useState(2);
  const [socialToolShadowColor, setSocialToolShadowColor] = useState("#000000");
  const [socialToolShadowOpacity, setSocialToolShadowOpacity] = useState(60);
  const [socialToolShadowSize, setSocialToolShadowSize] = useState(8);
  const [socialToolShadowAngle, setSocialToolShadowAngle] = useState(135);
  const [socialToolShadowDistance, setSocialToolShadowDistance] = useState(8);
  const [socialToolOutlinePosition, setSocialToolOutlinePosition] =
    useState("outside");
  const [socialFontFamily, setSocialFontFamily] = useState("inherit");
  const [socialActiveTool, setSocialActiveTool] = useState("pointer");
  const [socialSelectedLayer, setSocialSelectedLayer] = useState("");
  const [socialLayerOrder, setSocialLayerOrder] = useState<string[]>([]);
  const [socialLayerVisible, setSocialLayerVisible] = useState<
    Record<string, boolean>
  >({});
  const [socialLayerLocked, setSocialLayerLocked] = useState<
    Record<string, boolean>
  >({});
  const [socialShapeKind, setSocialShapeKind] = useState("rect");
  const [socialShapeColor, setSocialShapeColor] = useState("#3aa6d9");
  const [socialShapeOpacity, setSocialShapeOpacity] = useState(60);
  const [socialShapeStyles, setSocialShapeStyles] = useState({
    shape: { kind: "rect", color: "#3aa6d9", opacity: 60 },
  });
  const [socialImagePickerOpen, setSocialImagePickerOpen] = useState(false);
  const [socialImagePickerMode, setSocialImagePickerMode] = useState("add");
  const [socialSelectedImageId, setSocialSelectedImageId] = useState("");
  const [socialPreviewOverrideUrl, setSocialPreviewOverrideUrl] = useState("");
  const [socialImageLayers, setSocialImageLayers] = useState({});
  const [socialFooterBrandSide, setSocialFooterBrandSide] = useState<"left" | "right">(
    "left",
  );
  const [socialDateComponentSide, setSocialDateComponentSide] = useState<
    "left" | "right"
  >("left");
  const [socialDateTextFormat, setSocialDateTextFormat] = useState<
    "start" | "range"
  >("start");
  const [socialDateTextAlign, setSocialDateTextAlign] = useState<
    "left" | "center"
  >("center");
  const [socialFooterInfoSource, setSocialFooterInfoSource] = useState<
    "age" | "location" | "cta"
  >("age");
  const [socialFooterInfoLocationIcon, setSocialFooterInfoLocationIcon] =
    useState<"map-pin" | "pin-location" | "maps">("map-pin");
  const [socialFooterInfoEmptyMode, setSocialFooterInfoEmptyMode] = useState<
    "blank" | "name" | "hash-name" | "tutoring"
  >("blank");
  const [socialFooterInfoEmptyName, setSocialFooterInfoEmptyName] = useState("");
  const [socialFooterInfoTextColor, setSocialFooterInfoTextColor] =
    useState("#ffffff");
  const [socialFooterInfoShadowColor, setSocialFooterInfoShadowColor] =
    useState("#000000");
  const [socialBandRowsAlign, setSocialBandRowsAlign] = useState<
    "left" | "center"
  >("left");
  const [socialBandRowsText, setSocialBandRowsText] = useState({
    band1: "",
    band2: "",
    band3: "",
    band4: "",
  });
  const [socialBandContactText, setSocialBandContactText] = useState({
    contactA: "",
    contactB: "",
  });
  const [socialBandBrandAlign, setSocialBandBrandAlign] = useState<
    "left" | "center" | "right"
  >("center");
  const [socialBandContactAlign, setSocialBandContactAlign] = useState<{
    contactA: "left" | "center" | "right";
    contactB: "left" | "center" | "right";
  }>({
    contactA: "left",
    contactB: "right",
  });
  const [socialBandContactConfig, setSocialBandContactConfig] = useState<
    1 | 2 | 3
  >(1);
  const [socialPhotoFooterAlign, setSocialPhotoFooterAlign] = useState<
    "left" | "center"
  >("center");
  const [socialPhotoFooterBrandAlign, setSocialPhotoFooterBrandAlign] = useState<
    "left" | "center" | "right"
  >("center");
  const [socialPhotoFooterBottomMode, setSocialPhotoFooterBottomMode] = useState<
    "cta" | "contact"
  >("cta");
  const [socialSuccessBrandSide, setSocialSuccessBrandSide] = useState<
    "left" | "right"
  >("left");
  const [socialSuccessContactText, setSocialSuccessContactText] = useState("");
  const [socialSuccessSideTextColors, setSocialSuccessSideTextColors] = useState<{
    left: string;
    right: string;
  }>({
    left: "#ffffff",
    right: "#ffffff",
  });
  const socialSuccessColorRequestRef = useRef(0);
  const [socialPreviewDropActive, setSocialPreviewDropActive] = useState(false);
  const [socialPreviewZoomMode, setSocialPreviewZoomMode] = useState<
    "fit" | "100" | "150" | "200"
  >("fit");
  const [socialPreviewFitScale, setSocialPreviewFitScale] = useState(1);
  const [socialPreviewIsPanning, setSocialPreviewIsPanning] = useState(false);
  const socialPreviewRef = useRef(null);
  const socialPreviewViewportRef = useRef(null);
  const socialPreviewPanStateRef = useRef(null);
  const [socialShadowPopupOpen, setSocialShadowPopupOpen] = useState(false);
  const [socialOutlinePopupOpen, setSocialOutlinePopupOpen] = useState(false);
  const [socialFontPopupOpen, setSocialFontPopupOpen] = useState(false);
  const [socialShapePopupOpen, setSocialShapePopupOpen] = useState(false);
  const [socialInlineEditorLayer, setSocialInlineEditorLayer] = useState("");
  const [socialInlineEditorValue, setSocialInlineEditorValue] = useState("");
  const [socialInlineEditorOriginalValue, setSocialInlineEditorOriginalValue] = useState("");
  const [socialInlineTextOverrides, setSocialInlineTextOverrides] = useState<
    Record<string, string>
  >({});
  const [socialLayerFrames, setSocialLayerFrames] = useState<
    Record<string, { x: number; y: number; width: number; height: number }>
  >({});
  const [socialDraggingLayer, setSocialDraggingLayer] = useState("");
  const socialDragStateRef = useRef(null);
  const socialResizeStateRef = useRef(null);
  const socialShapeDrawStateRef = useRef(null);
  const socialSuppressTextInsertClickRef = useRef(false);
  const socialShapeCounterRef = useRef(1);
  const socialImageCounterRef = useRef(1);
  const socialTextCounterRef = useRef(1);
  const socialHoldTimerRef = useRef(null);
  const [socialHistory, setSocialHistory] = useState([]);
  const [socialHistoryIndex, setSocialHistoryIndex] = useState(-1);
  const socialApplyingHistoryRef = useRef(false);
  const SOCIAL_FONT_OPTIONS = [
    "inherit",
    "Poppins, sans-serif",
    "Arial, sans-serif",
    "Georgia, serif",
    "'Trebuchet MS', sans-serif",
    "'Courier New', monospace",
  ];
  const SOCIAL_LAYER_LABELS = {
    bg: "Background",
    media: "Media",
    "band-overlay": "Overlay",
    "band-brand": "Brand",
    "band-contact-a": "Contact A",
    "band-contact-b": "Contact B",
    "band-text-1": "Band Text 1",
    "band-text-2": "Band Text 2",
    "band-text-3": "Band Text 3",
    "band-text-4": "Band Text 4",
    shape: "Shape",
    "band-1": "Band 1",
    "band-2": "Band 2",
    "band-3": "Band 3",
    "band-4": "Band 4",
    headline: "Headline",
    start: "Start Date",
    cta: "Footer Info",
    footer: "Footer",
    brand: "Brand",
    contact: "Contact",
    datebox: "Date Box",
    "success-box": "Testimonial Box",
    "success-testimonial": "Testimonial",
    "success-brand": "Brand",
    "success-contact": "Contact",
  };
  const SOCIAL_PREVIEW_ZOOM_MODES = [
    { value: "fit", label: "Fit" },
    { value: "100", label: "100%" },
    { value: "150", label: "150%" },
    { value: "200", label: "200%" },
  ] as const;
  const socialDesignWidth = Math.max(1, Number(socialAspect?.width) || 1080);
  const socialDesignHeight = Math.max(1, Number(socialAspect?.height) || 1080);
  const socialFontPercentToDesignPx = (percent: number) =>
    Math.max(8, Math.round((socialDesignHeight * Math.max(0, Number(percent) || 0)) / 100));
  const socialPreviewScale = useMemo(() => {
    if (socialPreviewZoomMode === "fit") {
      return Math.max(0.05, Math.min(4, socialPreviewFitScale));
    }
    const percent = Number.parseInt(socialPreviewZoomMode, 10);
    if (!Number.isFinite(percent) || percent <= 0) return 1;
    return Math.max(0.05, Math.min(4, percent / 100));
  }, [socialPreviewFitScale, socialPreviewZoomMode]);
  const socialPreviewScaledWidth = Math.max(
    1,
    Math.round(socialDesignWidth * socialPreviewScale),
  );
  const socialPreviewScaledHeight = Math.max(
    1,
    Math.round(socialDesignHeight * socialPreviewScale),
  );
  const socialPreviewOverflowEnabled = socialPreviewZoomMode !== "fit";
  const clampLayerValue = (value, min, max) => Math.max(min, Math.min(max, value));
  const socialPreviewViewportHeight = Math.max(
    360,
    Math.min(
      760,
      Math.round((socialDesignHeight / Math.max(1, socialDesignWidth)) * 900),
    ),
  );
  const socialFrameToStyle = (frame) => ({
    left: `${(frame.x / 1000) * 100}%`,
    top: `${(frame.y / 1000) * 100}%`,
    width: `${(frame.width / 1000) * 100}%`,
    height: `${(frame.height / 1000) * 100}%`,
  });
  const buildDefaultLayerFrames = (layoutPreset) => {
    if (layoutPreset === "Band rows") {
      return {
        shape: { x: 280, y: 100, width: 440, height: 180 },
        headline: { x: 40, y: 260, width: 920, height: 84 },
        start: { x: 40, y: 355, width: 920, height: 84 },
        cta: { x: 40, y: 545, width: 920, height: 84 },
      };
    }
    if (layoutPreset === "Photo + footer") {
      return {
        shape: { x: 280, y: 100, width: 440, height: 180 },
        headline: { x: 0, y: 100, width: 1000, height: 220 },
        start: { x: 40, y: 60, width: 500, height: 140 },
        cta: { x: 45, y: 890, width: 910, height: 85 },
      };
    }
    if (layoutPreset === "Schedule list") {
      return {
        shape: { x: 280, y: 100, width: 440, height: 180 },
        headline: { x: 55, y: 160, width: 890, height: 250 },
        start: { x: 40, y: 60, width: 500, height: 140 },
        cta: { x: 55, y: 420, width: 890, height: 220 },
      };
    }
    return {
      shape: { x: 280, y: 100, width: 440, height: 180 },
      headline: { x: 55, y: 160, width: 890, height: 250 },
      start: { x: 40, y: 60, width: 500, height: 140 },
      cta: { x: 55, y: 420, width: 890, height: 220 },
    };
  };

  useEffect(() => {
    const viewport = socialPreviewViewportRef.current;
    if (!viewport) return;
    const recomputeFitScale = () => {
      const viewportWidth = Math.max(1, viewport.clientWidth - 16);
      const viewportHeight = Math.max(1, viewport.clientHeight - 16);
      const fitScale = Math.min(
        viewportWidth / socialDesignWidth,
        viewportHeight / socialDesignHeight,
      );
      setSocialPreviewFitScale(Math.max(0.05, Math.min(4, fitScale)));
    };
    recomputeFitScale();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => recomputeFitScale());
      resizeObserver.observe(viewport);
    }
    window.addEventListener("resize", recomputeFitScale);
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", recomputeFitScale);
    };
  }, [socialDesignHeight, socialDesignWidth]);

  useEffect(() => {
    if (socialPreviewZoomMode !== "fit") return;
    const viewport = socialPreviewViewportRef.current;
    if (!viewport) return;
    viewport.scrollLeft = 0;
    viewport.scrollTop = 0;
  }, [socialPreviewZoomMode, socialPreviewScale]);

  const beginSocialPreviewPan = (event) => {
    if (socialPreviewZoomMode === "fit") return;
    if (socialActiveTool !== "pointer") return;
    if (event.button !== 0) return;
    const viewport = socialPreviewViewportRef.current;
    if (!viewport) return;
    const canvas = socialPreviewRef.current;
    const target = event.target;
    if (target !== viewport && target !== canvas) return;
    socialPreviewPanStateRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startScrollLeft: viewport.scrollLeft,
      startScrollTop: viewport.scrollTop,
    };
    if (event.currentTarget?.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setSocialPreviewIsPanning(true);
  };

  const onSocialPreviewPanMove = (event) => {
    const panState = socialPreviewPanStateRef.current;
    if (!panState || panState.pointerId !== event.pointerId) return;
    const viewport = socialPreviewViewportRef.current;
    if (!viewport) return;
    const deltaX = event.clientX - panState.startClientX;
    const deltaY = event.clientY - panState.startClientY;
    viewport.scrollLeft = panState.startScrollLeft - deltaX;
    viewport.scrollTop = panState.startScrollTop - deltaY;
    event.preventDefault();
  };

  const endSocialPreviewPan = (event) => {
    const panState = socialPreviewPanStateRef.current;
    if (!panState || panState.pointerId !== event.pointerId) return;
    if (event.currentTarget?.releasePointerCapture) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {}
    }
    socialPreviewPanStateRef.current = null;
    setSocialPreviewIsPanning(false);
  };

  useEffect(() => {
    const defaults = buildDefaultLayerFrames(socialDraft.layout_preset);
    setSocialLayerFrames((prev) => ({
      ...prev,
      shape: prev.shape ?? defaults.shape,
      headline: prev.headline ?? defaults.headline,
      start: prev.start ?? defaults.start,
      cta: prev.cta ?? defaults.cta,
    }));
  }, [socialDraft.layout_preset]);

  useEffect(() => {
    if (socialDraggingLayer) return;
    const maxByLayer = socialTextMaxWidthByLayout(socialDraft.layout_preset);
    const textLayers = ["headline", "start", "cta", SOCIAL_BRAND_LAYER_ID];
    const announcementBold =
      isBoldHeadlineAnnouncementTemplate({
        templateStyle: socialDraft.template_style,
        layoutPreset: socialDraft.layout_preset,
      });

    setSocialLayerFrames((prev) => {
      let changed = false;
      const next = { ...prev };

      for (const layerId of textLayers) {
        if (!socialLayerVisible[layerId]) continue;
        const maxWidth = maxByLayer[layerId];
        if (!maxWidth) continue;
        const frame = next[layerId];
        if (!frame) continue;

        const text = socialRenderedLayerText(layerId);
        const fontSize = socialTextFontSizes[layerId] ?? 24;
        const fontWeight = layerId === "headline" ? 800 : layerId === "cta" ? 700 : 700;

        if (announcementBold && layerId === "headline") {
          const measured = measureWrappedSocialText({
            text,
            fontSize,
            fontWeight,
            fontFamily:
              socialFontFamily && socialFontFamily !== "inherit"
                ? socialFontFamily
                : "Poppins, sans-serif",
            maxWidth: 1000,
            minWidth: 1000,
            paddingX: 24,
            paddingY: 0,
            lineHeightMultiplier: 0.9,
            outlineWidth: socialToolOutlineWidth,
            tightHeight: true,
          });

          const width = 1000;
          const height = clampLayerValue(measured.height, 70, 980);
          const x = 0;
          const y = 0;

          if (
            frame.width !== width ||
            frame.height !== height ||
            frame.x !== x ||
            frame.y !== y
          ) {
            next[layerId] = {
              ...frame,
              x,
              y,
              width,
              height,
            };
            changed = true;
          }
          continue;
        }

        const measured = measureWrappedSocialText({
          text,
          fontSize,
          fontWeight,
          fontFamily:
            socialFontFamily && socialFontFamily !== "inherit"
              ? socialFontFamily
              : "Poppins, sans-serif",
          maxWidth,
          minWidth: 120,
          paddingX: 14,
          paddingY: 12,
          lineHeightMultiplier: 1.1,
          outlineWidth: socialToolOutlineWidth,
        });

        const width = clampLayerValue(measured.width, 16, maxWidth);
        const height = clampLayerValue(measured.height, 16, 980);
        const x = clampLayerValue(frame.x, 0, Math.max(0, 1000 - width));
        const y = clampLayerValue(frame.y, 0, Math.max(0, 1000 - height));

        if (
          frame.width !== width ||
          frame.height !== height ||
          frame.x !== x ||
          frame.y !== y
        ) {
          next[layerId] = {
            ...frame,
            x,
            y,
            width,
            height,
          };
          changed = true;
        }
      }

      if (
        socialDraft.layout_preset === "Photo + footer" &&
        socialLayerVisible.headline
      ) {
        const photoFooterSwappedText = resolveEnrollmentSwappedOfferText({
          templateStyle: socialDraft.template_style,
          headlineText: socialDraft.headline,
          callToAction: socialDraft.call_to_action,
          priceDetail: socialDraft.price_detail,
          startDate: socialDraft.start_date,
          productName: socialSelectedProduct?.product_name,
        });
        const photoFooterHeadlineText = resolvePhotoFooterHeadlineText({
          templateStyle: socialDraft.template_style,
          headlineText: photoFooterSwappedText.headline,
          locationText: socialDraft.location_detail,
          startDate: socialDraft.start_date,
          endDate: socialDraft.end_date,
        });
        const headlineFont = Math.max(
          8,
          Number(socialTextFontSizes.headline ?? 150) || 150,
        );
        const measured = measureWrappedSocialText({
          text: photoFooterHeadlineText,
          fontSize: headlineFont,
          fontWeight: 800,
          fontFamily:
            socialFontFamily && socialFontFamily !== "inherit"
              ? socialFontFamily
              : "Poppins, sans-serif",
          maxWidth: 1000,
          minWidth: 1000,
          paddingX: 12,
          paddingY: 8,
          lineHeightMultiplier: 1,
          outlineWidth: 0,
        });
        const nextHeadlineFrame = {
          x: 0,
          y: 100,
          width: 1000,
          height: clampLayerValue(measured.height, 120, 900),
        };
        const currentHeadlineFrame = next.headline ?? nextHeadlineFrame;
        if (
          currentHeadlineFrame.x !== nextHeadlineFrame.x ||
          currentHeadlineFrame.y !== nextHeadlineFrame.y ||
          currentHeadlineFrame.width !== nextHeadlineFrame.width ||
          currentHeadlineFrame.height !== nextHeadlineFrame.height
        ) {
          next.headline = {
            ...currentHeadlineFrame,
            ...nextHeadlineFrame,
          };
          changed = true;
        }
      }

      if (announcementBold && socialLayerVisible[SOCIAL_HEADER_LAYER_ID] && socialLayerVisible.headline) {
        const headlineFrame = next.headline;
        if (headlineFrame) {
          const shapeCurrent = next[SOCIAL_HEADER_LAYER_ID] ?? {
            x: headlineFrame.x,
            y: headlineFrame.y,
            width: headlineFrame.width,
            height: headlineFrame.height,
          };
          if (
            shapeCurrent.x !== headlineFrame.x ||
            shapeCurrent.y !== headlineFrame.y ||
            shapeCurrent.width !== headlineFrame.width ||
            shapeCurrent.height !== headlineFrame.height
          ) {
            next[SOCIAL_HEADER_LAYER_ID] = {
              ...shapeCurrent,
              x: headlineFrame.x,
              y: headlineFrame.y,
              width: headlineFrame.width,
              height: headlineFrame.height,
            };
            changed = true;
          }
        }

        const nextFooterFrame = resolveAnnouncementFooterFrame();
        const footerCurrent = next[SOCIAL_FOOTER_LAYER_ID] ?? {
          ...nextFooterFrame,
        };
        if (
          footerCurrent.x !== nextFooterFrame.x ||
          footerCurrent.y !== nextFooterFrame.y ||
          footerCurrent.width !== nextFooterFrame.width ||
          footerCurrent.height !== nextFooterFrame.height
        ) {
          next[SOCIAL_FOOTER_LAYER_ID] = {
            ...footerCurrent,
            ...nextFooterFrame,
          };
          changed = true;
        }

        const contactCurrent = next[SOCIAL_CONTACT_LAYER_ID] ?? {
          ...nextFooterFrame,
        };
        if (
          contactCurrent.x !== nextFooterFrame.x ||
          contactCurrent.y !== nextFooterFrame.y ||
          contactCurrent.width !== nextFooterFrame.width ||
          contactCurrent.height !== nextFooterFrame.height
        ) {
          next[SOCIAL_CONTACT_LAYER_ID] = {
            ...contactCurrent,
            ...nextFooterFrame,
          };
          changed = true;
        }

        const dateBoxX = socialDateComponentSide === "right" ? 650 : 50;
        const headerFrameForDate = next[SOCIAL_HEADER_LAYER_ID] ?? next.headline;
        const headerBottom =
          (headerFrameForDate?.y ?? 0) + (headerFrameForDate?.height ?? 0);
        const dateBoxY = clampLayerValue(headerBottom + 50, 0, 670);
        const dateBoxCurrent = next[SOCIAL_DATE_BOX_LAYER_ID] ?? {
          x: dateBoxX,
          y: dateBoxY,
          width: 300,
          height: 250,
        };
        if (
          dateBoxCurrent.x !== dateBoxX ||
          dateBoxCurrent.y !== dateBoxY ||
          dateBoxCurrent.width !== 300 ||
          dateBoxCurrent.height !== 250
        ) {
          next[SOCIAL_DATE_BOX_LAYER_ID] = {
            ...dateBoxCurrent,
            x: dateBoxX,
            y: dateBoxY,
            width: 300,
            height: 250,
          };
          changed = true;
        }

        const footerInfoText = resolveBoldHeadlineFooterText({
          templateStyle: socialDraft.template_style,
          layoutPreset: socialDraft.layout_preset,
          headlineText: socialDraft.headline,
          callToAction: socialDraft.call_to_action,
          priceDetail: socialDraft.price_detail,
          startDate: socialDraft.start_date,
          productName: socialSelectedProduct?.product_name,
          announcementFooterText: socialAnnouncementFooterInfo.text,
        });
        const footerInfoFontPt = Math.max(
          8,
          Number(
            socialTextFontSizes.cta ??
              resolveAnnouncementFooterInfoFontPt(footerInfoText),
          ) || resolveAnnouncementFooterInfoFontPt(footerInfoText),
        );
        const footerInfoFrame = resolveAnnouncementFooterInfoFrame({
          text: footerInfoText,
          fontSize: footerInfoFontPt,
          footerFrame: next[SOCIAL_FOOTER_LAYER_ID],
        });
        const footerInfoCurrent = next.cta ?? {
          ...footerInfoFrame,
        };
        if (
          footerInfoCurrent.x !== footerInfoFrame.x ||
          footerInfoCurrent.y !== footerInfoFrame.y ||
          footerInfoCurrent.width !== footerInfoFrame.width ||
          footerInfoCurrent.height !== footerInfoFrame.height
        ) {
          next.cta = {
            ...footerInfoCurrent,
            ...footerInfoFrame,
          };
          changed = true;
        }

        const dateTextCurrent = next.start ?? {
          x: dateBoxX,
          y: dateBoxY,
          width: 300,
          height: 250,
        };
        if (
          dateTextCurrent.x !== dateBoxX ||
          dateTextCurrent.y !== dateBoxY ||
          dateTextCurrent.width !== 300 ||
          dateTextCurrent.height !== 250
        ) {
          next.start = {
            ...dateTextCurrent,
            x: dateBoxX,
            y: dateBoxY,
            width: 300,
            height: 250,
          };
          changed = true;
        }

        if (socialLayerVisible[SOCIAL_BRAND_LAYER_ID]) {
          if (socialHasBrandLogo) {
            const nextBrandLogoFrame = resolveAnnouncementBrandLogoFrame();
            const brandCurrent = next[SOCIAL_BRAND_LAYER_ID] ?? {
              ...nextBrandLogoFrame,
            };
            if (
              brandCurrent.x !== nextBrandLogoFrame.x ||
              brandCurrent.y !== nextBrandLogoFrame.y ||
              brandCurrent.width !== nextBrandLogoFrame.width ||
              brandCurrent.height !== nextBrandLogoFrame.height
            ) {
              next[SOCIAL_BRAND_LAYER_ID] = {
                ...brandCurrent,
                ...nextBrandLogoFrame,
              };
              changed = true;
            }
          } else {
            const brandHeight = nextFooterFrame.height;
            const brandCurrent = next[SOCIAL_BRAND_LAYER_ID] ?? {
              x: 0,
              y: nextFooterFrame.y,
              width: 1000,
              height: brandHeight,
            };
            if (
              brandCurrent.x !== 0 ||
              brandCurrent.y !== nextFooterFrame.y ||
              brandCurrent.width !== 1000 ||
              brandCurrent.height !== brandHeight
            ) {
              next[SOCIAL_BRAND_LAYER_ID] = {
                ...brandCurrent,
                x: 0,
                y: nextFooterFrame.y,
                width: 1000,
                height: brandHeight,
              };
              changed = true;
            }
          }
        }
      }

      return changed ? next : prev;
    });
  }, [
    socialDraft.call_to_action,
    socialDraft.price_detail,
    socialDraft.end_date,
    socialDraft.headline,
    socialDraft.template_style,
    socialDraft.layout_preset,
    socialDraft.location_detail,
    socialDraft.start_date,
    socialDraggingLayer,
    socialFontFamily,
    companyDraft?.company_logo_url,
    businessForm?.formData?.business_phone,
    businessForm?.formData?.business_email,
    org?.business_phone,
    org?.business_email,
    org?.business_name,
    socialDateComponentSide,
    socialLayerVisible.brand,
    socialLayerVisible.shape,
    socialLayerVisible.footer,
    socialLayerVisible.contact,
    socialLayerVisible.datebox,
    socialLayerVisible.cta,
    socialLayerVisible.headline,
    socialLayerVisible.start,
    socialTextFontSizes.cta,
    socialTextFontSizes.headline,
    socialTextFontSizes.start,
    socialToolOutlineWidth,
    socialDraft.age_range,
    socialFooterInfoSource,
    socialFooterInfoEmptyMode,
    socialFooterInfoEmptyName,
    socialSelectedProduct?.product_name,
    socialAspect?.height,
    socialAspect?.width,
  ]);
  const imageLibraryTotalPages = Math.max(
    1,
    Math.ceil(imageLibraryAll.length / Math.max(1, imageLibraryPerPage)),
  );
  const imageLibraryPageSafe = Math.min(
    imageLibraryTotalPages,
    Math.max(1, imageLibraryPage),
  );
  const imageLibraryPageStart =
    (imageLibraryPageSafe - 1) * Math.max(1, imageLibraryPerPage);
  const imageLibraryPageRows = imageLibraryAll.slice(
    imageLibraryPageStart,
    imageLibraryPageStart + Math.max(1, imageLibraryPerPage),
  );

  useEffect(() => {
    if (activeTab !== "PRODUCTS" || marketingTab !== "IMAGE_LIBRARY") return;
    if (!token) return;
    void loadCatalogMedia({
      kind: "product",
      id: GLOBAL_LIBRARY_ID,
      scope: "global",
    });
  }, [activeTab, marketingTab, token]);

  useEffect(() => {
    if (activeTab !== "MARKETING" || marketingSection !== "POST_BUILDER") return;
    if (!token) return;
    void loadCatalogMedia({
      kind: "product",
      id: GLOBAL_LIBRARY_ID,
      scope: "global",
    });
  }, [activeTab, marketingSection, token]);

  useEffect(() => {
    if (imageLibraryPage > imageLibraryTotalPages) {
      setImageLibraryPage(imageLibraryTotalPages);
    }
  }, [imageLibraryPage, imageLibraryTotalPages]);

  const normalizeHexColor = (inputColor) => {
    const normalized = String(inputColor || "#000000").trim();
    const hex = normalized.replace("#", "");
    const fullHex =
      hex.length === 3
        ? hex
            .split("")
            .map((ch) => ch + ch)
            .join("")
        : hex.padEnd(6, "0").slice(0, 6);
    return fullHex;
  };

  const buildOutsideTextStrokeShadow = (width, color) => {
    const radius = Math.max(0, Math.round(Number(width) || 0));
    if (!radius) return "none";
    const strokeColor = String(color || "#000000");
    const shadows = [];
    for (let y = -radius; y <= radius; y += 1) {
      for (let x = -radius; x <= radius; x += 1) {
        if (x === 0 && y === 0) continue;
        if (Math.hypot(x, y) > radius + 0.25) continue;
        shadows.push(`${x}px ${y}px 0 ${strokeColor}`);
      }
    }
    return shadows.length ? shadows.join(", ") : "none";
  };

  const scalePreviewValue = (value, fallback = 0) => {
    const numeric = Number(value);
    const base = Number.isFinite(numeric) ? numeric : fallback;
    return base * socialPreviewScale;
  };

  const scaleCssPxValues = (cssValue) => {
    const raw = String(cssValue || "").trim();
    if (!raw) return "";
    return raw.replace(/(-?\d*\.?\d+)px/g, (_full, numText) => {
      const px = Number.parseFloat(numText);
      if (!Number.isFinite(px)) return "0px";
      return `${(px * socialPreviewScale).toFixed(2)}px`;
    });
  };

  const socialShadowCssScaled = useMemo(() => {
    const fullHex = normalizeHexColor(socialToolShadowColor);
    const r = Number.parseInt(fullHex.slice(0, 2), 16) || 0;
    const g = Number.parseInt(fullHex.slice(2, 4), 16) || 0;
    const b = Number.parseInt(fullHex.slice(4, 6), 16) || 0;
    const opacity = Math.max(0, Math.min(100, socialToolShadowOpacity)) / 100;
    const angle = (Math.max(0, Math.min(360, socialToolShadowAngle)) * Math.PI) / 180;
    const size = Math.max(0, socialToolShadowSize) * socialPreviewScale;
    const distance = Math.max(0, socialToolShadowDistance) * socialPreviewScale;
    const offsetX = Math.round(Math.cos(angle) * distance);
    const offsetY = Math.round(Math.sin(angle) * distance);
    const blur = Math.max(1, Math.round(size));
    return `${offsetX}px ${offsetY}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacity})`;
  }, [
    socialPreviewScale,
    socialToolShadowAngle,
    socialToolShadowColor,
    socialToolShadowDistance,
    socialToolShadowOpacity,
    socialToolShadowSize,
  ]);

  const previewTextStyle = (target, fallbackSize) => {
    const isSelected = socialToolTarget === target;
    const forceAnnouncementHeadlineStyle =
      target === "headline" &&
      isBoldHeadlineAnnouncementTemplate({
        templateStyle: socialDraft.template_style,
        layoutPreset: socialDraft.layout_preset,
      });
    const layerFontSize = socialTextFontSizes[target] ?? fallbackSize;
    const layerColor = String(socialTextColors[target] ?? "").trim();
    const scaledFontSize = scalePreviewValue(layerFontSize, fallbackSize);
    const scaledOutlineWidth = Math.max(
      0,
      scalePreviewValue(socialToolOutlineWidth, 0),
    );
    if (forceAnnouncementHeadlineStyle) {
      return {
        color: layerColor || "#ffffff",
        fontSize: `${scaledFontSize}px`,
        WebkitTextStroke: "0px transparent",
        textShadow: buildOutsideTextStrokeShadow(
          scaledOutlineWidth,
          socialToolOutlineColor,
        ),
        lineHeight: 1.1,
        fontFamily: socialFontFamily,
      };
    }
    if (!isSelected && !forceAnnouncementHeadlineStyle) {
      return {
        color: layerColor || "#ffffff",
        fontSize: `${scaledFontSize}px`,
        lineHeight: 1.1,
        fontFamily: socialFontFamily,
      };
    }
    return {
      color: layerColor || socialToolColor,
      fontSize: `${scaledFontSize}px`,
      WebkitTextStroke: `${scaledOutlineWidth}px ${socialToolOutlineColor}`,
      textShadow: socialShadowCssScaled,
      lineHeight: 1.1,
      fontFamily: socialFontFamily,
    };
  };

  const applySocialFontSize = (nextSize, target = socialToolTarget) => {
    const clamped = Math.max(8, Math.min(220, Number(nextSize) || 48));
    setSocialToolFontSize(clamped);
    if (!target) return;
    setSocialTextFontSizes((prev) => ({ ...prev, [target]: clamped }));
  };

  const applySocialTextColor = (nextColor: string) => {
    const safeColor = String(nextColor || "#ffffff");
    setSocialToolColor(safeColor);
    const targetLayer = isSocialTextLayer(socialSelectedLayer)
      ? socialSelectedLayer
      : isSocialTextLayer(socialToolTarget)
        ? socialToolTarget
        : "";
    if (!targetLayer) return;
    setSocialTextColors((prev) => ({
      ...prev,
      [targetLayer]: safeColor,
    }));
  };

  const socialLayerZ = (id) => {
    const index = socialLayerOrder.indexOf(id);
    if (index < 0) return 10;
    return 10 + (socialLayerOrder.length - 1 - index);
  };

  const socialMediaCandidates = useMemo(() => {
    const byKey = new Map();
    [...imageLibraryAll, ...socialMediaOptions].forEach((media, idx) => {
      if (!media?.media_url && !media?.url) return;
      const url = media.media_url ?? media.url;
      const type = media.media_type ?? media.type ?? "PHOTO";
      const id = media.id ?? `${type}:${url}:${idx}`;
      const key = `${type}|${url}`;
      if (byKey.has(key)) return;
      byKey.set(key, {
        id,
        url,
        type,
        label: media.caption_text ?? media.label ?? "Media",
      });
    });
    return Array.from(byKey.values());
  }, [imageLibraryAll, socialMediaOptions]);

  const socialPreviewMediaResolved = useMemo(() => {
    if (socialPreviewOverrideUrl) {
      const lower = socialPreviewOverrideUrl.toLowerCase();
      return {
        url: socialPreviewOverrideUrl,
        type:
          lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.endsWith(".webm")
            ? "VIDEO"
            : "PHOTO",
      };
    }
    return socialPreviewMedia;
  }, [socialPreviewMedia, socialPreviewOverrideUrl]);

  useEffect(() => {
    if (socialPreviewOverrideUrl) return;
    if (!socialPreviewMedia?.url) return;
    setSocialSelectedImageId((prev) => prev || socialPreviewMedia.id || "");
  }, [socialPreviewMedia?.id, socialPreviewMedia?.url, socialPreviewOverrideUrl]);

  const socialSnapshot = useMemo(
    () =>
      JSON.stringify({
        socialToolTarget,
        socialToolColor,
        socialToolFontSize,
        socialTextFontSizes,
        socialTextColors,
        socialToolAlignX,
        socialToolAlignY,
        socialToolOutlineColor,
        socialToolOutlineWidth,
        socialToolOutlinePosition,
        socialToolShadowColor,
        socialToolShadowOpacity,
        socialToolShadowSize,
        socialToolShadowAngle,
        socialToolShadowDistance,
        socialFontFamily,
        socialLayerOrder,
        socialLayerVisible,
        socialLayerLocked,
        socialLayerFrames,
        socialSelectedLayer,
        socialShapeKind,
        socialShapeColor,
        socialShapeOpacity,
        socialShapeStyles,
        socialImageLayers,
        socialFooterBrandSide,
        socialDateComponentSide,
        socialDateTextFormat,
        socialDateTextAlign,
        socialFooterInfoSource,
        socialFooterInfoLocationIcon,
        socialFooterInfoEmptyMode,
        socialFooterInfoEmptyName,
        socialFooterInfoTextColor,
        socialFooterInfoShadowColor,
        socialBandRowsAlign,
        socialBandRowsText,
        socialBandContactText,
        socialBandBrandAlign,
        socialBandContactAlign,
        socialBandContactConfig,
        socialPhotoFooterAlign,
        socialPhotoFooterBrandAlign,
        socialPhotoFooterBottomMode,
        socialSuccessBrandSide,
        socialSuccessContactText,
        socialSuccessSideTextColors,
        socialPreviewOverrideUrl,
      }),
    [
      socialToolTarget,
      socialToolColor,
      socialToolFontSize,
      socialTextFontSizes,
      socialTextColors,
      socialToolAlignX,
      socialToolAlignY,
      socialToolOutlineColor,
      socialToolOutlineWidth,
      socialToolOutlinePosition,
      socialToolShadowColor,
      socialToolShadowOpacity,
      socialToolShadowSize,
      socialToolShadowAngle,
      socialToolShadowDistance,
      socialFontFamily,
      socialLayerOrder,
      socialLayerVisible,
      socialLayerLocked,
      socialLayerFrames,
      socialSelectedLayer,
      socialShapeKind,
      socialShapeColor,
      socialShapeOpacity,
      socialShapeStyles,
      socialImageLayers,
      socialFooterBrandSide,
      socialDateComponentSide,
      socialDateTextFormat,
      socialDateTextAlign,
      socialFooterInfoSource,
      socialFooterInfoLocationIcon,
      socialFooterInfoEmptyMode,
      socialFooterInfoEmptyName,
      socialFooterInfoTextColor,
      socialFooterInfoShadowColor,
      socialBandRowsAlign,
      socialBandRowsText,
      socialBandContactText,
      socialBandBrandAlign,
      socialBandContactAlign,
      socialBandContactConfig,
      socialPhotoFooterAlign,
      socialPhotoFooterBrandAlign,
      socialPhotoFooterBottomMode,
      socialSuccessBrandSide,
      socialSuccessContactText,
      socialSuccessSideTextColors,
      socialPreviewOverrideUrl,
    ],
  );

  useEffect(() => {
    if (socialApplyingHistoryRef.current) return;
    const parsed = JSON.parse(socialSnapshot);
    setSocialHistory((prev) => {
      if (!prev.length) {
        setSocialHistoryIndex(0);
        return [parsed];
      }
      const current = prev[socialHistoryIndex];
      if (JSON.stringify(current) === socialSnapshot) return prev;
      const next = prev.slice(0, socialHistoryIndex + 1);
      next.push(parsed);
      setSocialHistoryIndex(next.length - 1);
      return next.slice(-100);
    });
  }, [socialSnapshot]);

  const applySocialSnapshot = (snap) => {
    if (!snap) return;
    socialApplyingHistoryRef.current = true;
    setSocialToolTarget(snap.socialToolTarget ?? "headline");
    setSocialToolColor(snap.socialToolColor ?? "#ffffff");
    setSocialToolFontSize(snap.socialToolFontSize ?? 48);
    setSocialTextFontSizes(
      snap.socialTextFontSizes ?? {
        headline: 48,
        start: 30,
        cta: 75,
      },
    );
    setSocialTextColors(snap.socialTextColors ?? {});
    setSocialToolAlignX(snap.socialToolAlignX ?? "center");
    setSocialToolAlignY(snap.socialToolAlignY ?? "center");
    setSocialToolOutlineColor(snap.socialToolOutlineColor ?? "#000000");
    setSocialToolOutlineWidth(snap.socialToolOutlineWidth ?? 2);
    setSocialToolOutlinePosition(snap.socialToolOutlinePosition ?? "outside");
    setSocialToolShadowColor(snap.socialToolShadowColor ?? "#000000");
    setSocialToolShadowOpacity(snap.socialToolShadowOpacity ?? 60);
    setSocialToolShadowSize(snap.socialToolShadowSize ?? 8);
    setSocialToolShadowAngle(snap.socialToolShadowAngle ?? 135);
    setSocialToolShadowDistance(snap.socialToolShadowDistance ?? 8);
    setSocialFontFamily(snap.socialFontFamily ?? "inherit");
    setSocialLayerOrder(snap.socialLayerOrder ?? ["media", "shape", "headline", "start", "cta"]);
    setSocialLayerVisible(
      snap.socialLayerVisible ?? {
        media: true,
        shape: true,
        headline: true,
        start: true,
        cta: true,
      },
    );
    setSocialLayerLocked(
      snap.socialLayerLocked ?? {
        media: false,
        shape: false,
        headline: false,
        start: false,
        cta: false,
      },
    );
    setSocialLayerFrames(
      snap.socialLayerFrames ?? buildDefaultLayerFrames(socialDraft.layout_preset),
    );
    setSocialSelectedLayer(snap.socialSelectedLayer ?? "headline");
    setSocialShapeKind(snap.socialShapeKind ?? "rect");
    setSocialShapeColor(snap.socialShapeColor ?? "#3aa6d9");
    setSocialShapeOpacity(snap.socialShapeOpacity ?? 60);
    setSocialShapeStyles(
      snap.socialShapeStyles ?? {
        shape: {
          kind: snap.socialShapeKind ?? "rect",
          color: snap.socialShapeColor ?? "#3aa6d9",
          opacity: snap.socialShapeOpacity ?? 60,
        },
      },
    );
    setSocialImageLayers(snap.socialImageLayers ?? {});
    setSocialFooterBrandSide(snap.socialFooterBrandSide === "right" ? "right" : "left");
    setSocialDateComponentSide(snap.socialDateComponentSide === "right" ? "right" : "left");
    setSocialDateTextFormat(snap.socialDateTextFormat === "range" ? "range" : "start");
    setSocialDateTextAlign(snap.socialDateTextAlign === "left" ? "left" : "center");
    setSocialFooterInfoSource(
      snap.socialFooterInfoSource === "location"
        ? "location"
        : snap.socialFooterInfoSource === "cta"
          ? "cta"
          : "age",
    );
    setSocialFooterInfoLocationIcon(
      snap.socialFooterInfoLocationIcon === "pin-location"
        ? "pin-location"
        : snap.socialFooterInfoLocationIcon === "maps"
          ? "maps"
          : "map-pin",
    );
    setSocialFooterInfoEmptyMode(
      snap.socialFooterInfoEmptyMode === "name"
        ? "name"
        : snap.socialFooterInfoEmptyMode === "hash-name"
          ? "hash-name"
          : snap.socialFooterInfoEmptyMode === "tutoring"
            ? "tutoring"
            : "blank",
    );
    setSocialFooterInfoEmptyName(String(snap.socialFooterInfoEmptyName ?? ""));
    setSocialFooterInfoTextColor(String(snap.socialFooterInfoTextColor ?? "#ffffff"));
    setSocialFooterInfoShadowColor(
      String(snap.socialFooterInfoShadowColor ?? "#000000"),
    );
    setSocialBandRowsAlign(
      snap.socialBandRowsAlign === "center" ? "center" : "left",
    );
    setSocialBandRowsText(
      snap.socialBandRowsText ?? {
        band1: "",
        band2: "",
        band3: "",
        band4: "",
      },
    );
    setSocialBandContactText(
      snap.socialBandContactText ?? {
        contactA: "",
        contactB: "",
      },
    );
    setSocialBandBrandAlign(
      snap.socialBandBrandAlign === "left"
        ? "left"
        : snap.socialBandBrandAlign === "right"
          ? "right"
          : "center",
    );
    setSocialBandContactAlign({
      contactA:
        snap.socialBandContactAlign?.contactA === "right"
          ? "right"
          : snap.socialBandContactAlign?.contactA === "center"
            ? "center"
            : "left",
      contactB:
        snap.socialBandContactAlign?.contactB === "left"
          ? "left"
          : snap.socialBandContactAlign?.contactB === "center"
            ? "center"
            : "right",
    });
    setSocialBandContactConfig(
      snap.socialBandContactConfig === 2
        ? 2
        : snap.socialBandContactConfig === 3
          ? 3
          : 1,
    );
    setSocialPhotoFooterAlign(
      snap.socialPhotoFooterAlign === "left" ? "left" : "center",
    );
    setSocialPhotoFooterBrandAlign(
      snap.socialPhotoFooterBrandAlign === "left"
        ? "left"
        : snap.socialPhotoFooterBrandAlign === "right"
          ? "right"
          : "center",
    );
    setSocialPhotoFooterBottomMode(
      snap.socialPhotoFooterBottomMode === "contact" ? "contact" : "cta",
    );
    setSocialSuccessBrandSide(
      snap.socialSuccessBrandSide === "right" ? "right" : "left",
    );
    setSocialSuccessContactText(String(snap.socialSuccessContactText ?? ""));
    setSocialSuccessSideTextColors({
      left: String(snap.socialSuccessSideTextColors?.left ?? "#ffffff"),
      right: String(snap.socialSuccessSideTextColors?.right ?? "#ffffff"),
    });
    setSocialPreviewOverrideUrl(snap.socialPreviewOverrideUrl ?? "");
    setTimeout(() => {
      socialApplyingHistoryRef.current = false;
    }, 0);
  };

  const socialUndo = () => {
    if (socialHistoryIndex <= 0) return;
    const nextIndex = socialHistoryIndex - 1;
    setSocialHistoryIndex(nextIndex);
    applySocialSnapshot(socialHistory[nextIndex]);
  };
  const socialRedo = () => {
    if (socialHistoryIndex < 0) return;
    if (socialHistoryIndex >= socialHistory.length - 1) return;
    const nextIndex = socialHistoryIndex + 1;
    setSocialHistoryIndex(nextIndex);
    applySocialSnapshot(socialHistory[nextIndex]);
  };

  const moveSocialLayer = (layerId, direction) => {
    if (socialLayerLocked[layerId]) return;
    setSocialLayerOrder((prev) => {
      const index = prev.indexOf(layerId);
      if (index < 0) return prev;
      const next = [...prev];
      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[swapIndex];
      next[swapIndex] = temp;
      return next;
    });
  };

  const socialToolButtonHandlers = (setter) => ({
    onMouseDown: () => {
      if (socialHoldTimerRef.current) clearTimeout(socialHoldTimerRef.current);
      socialHoldTimerRef.current = setTimeout(() => setter(true), 300);
    },
    onMouseUp: () => {
      if (socialHoldTimerRef.current) clearTimeout(socialHoldTimerRef.current);
    },
    onMouseLeave: () => {
      if (socialHoldTimerRef.current) clearTimeout(socialHoldTimerRef.current);
    },
  });

  const SOCIAL_TOOLBAR_BTN_BASE =
    "inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100 disabled:opacity-50";
  const SOCIAL_TOOLBAR_BTN_TOP = `${SOCIAL_TOOLBAR_BTN_BASE} h-[54px] w-[54px]`;
  const SOCIAL_TOOLBAR_BTN_RIGHT = `${SOCIAL_TOOLBAR_BTN_BASE} h-[54px] w-[54px]`;
  const SOCIAL_TOOLBAR_BTN_MINI = `${SOCIAL_TOOLBAR_BTN_BASE} h-9 w-9`;
  const SOCIAL_TOOLBAR_BTN_SELECTED = "border-blue-400 bg-blue-100 text-blue-700";
  const SOCIAL_TOOLBAR_ICON_SIZE = 22;
  const socialIconColor = (active) => (active ? "#2563eb" : "#374151");
  const socialShapeClassByKind = (kind) => {
    if (kind === "rectangle") return "rounded-none";
    if (kind === "rect") return "rounded-md";
    if (kind === "circle") return "rounded-full";
    if (kind === "triangle") {
      return "[clip-path:polygon(50%_0%,0%_100%,100%_100%)]";
    }
    if (kind === "diamond") {
      return "[clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]";
    }
    if (kind === "arrow") {
      return "[clip-path:polygon(0%_20%,68%_20%,68%_0%,100%_50%,68%_100%,68%_80%,0%_80%)]";
    }
    if (kind === "banner") {
      return "[clip-path:polygon(0%_0%,100%_0%,100%_35%,92%_50%,100%_65%,100%_100%,0%_100%,0%_65%,8%_50%,0%_35%)]";
    }
    return "rounded-md";
  };
  const SOCIAL_SHAPE_OPTIONS = [
    { key: "rectangle", shapeClass: socialShapeClassByKind("rectangle") },
    { key: "rect", shapeClass: "rounded-md" },
    { key: "circle", shapeClass: "rounded-full" },
    {
      key: "triangle",
      shapeClass: "[clip-path:polygon(50%_0%,0%_100%,100%_100%)]",
    },
    {
      key: "diamond",
      shapeClass: "[clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]",
    },
    {
      key: "arrow",
      shapeClass:
        "[clip-path:polygon(0%_20%,68%_20%,68%_0%,100%_50%,68%_100%,68%_80%,0%_80%)]",
    },
    {
      key: "banner",
      shapeClass:
        "[clip-path:polygon(0%_0%,100%_0%,100%_35%,92%_50%,100%_65%,100%_100%,0%_100%,0%_65%,8%_50%,0%_35%)]",
    },
  ];
  const SOCIAL_RESIZE_HANDLES = [
    { key: "nw", className: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize" },
    { key: "n", className: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize" },
    { key: "ne", className: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize" },
    { key: "e", className: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize" },
    { key: "se", className: "bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize" },
    { key: "s", className: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize" },
    { key: "sw", className: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize" },
    { key: "w", className: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize" },
  ];
  const SOCIAL_SHAPE_LAYER_PREFIX = "shape-extra-";
  const SOCIAL_IMAGE_LAYER_PREFIX = "image-extra-";
  const SOCIAL_TEXT_LAYER_PREFIX = "text-extra-";
  const SOCIAL_HEADER_LAYER_ID = "shape";
  const SOCIAL_BG_LAYER_ID = "bg";
  const SOCIAL_FOOTER_LAYER_ID = "footer";
  const SOCIAL_BRAND_LAYER_ID = "brand";
  const SOCIAL_CONTACT_LAYER_ID = "contact";
  const SOCIAL_DATE_BOX_LAYER_ID = "datebox";
  const SOCIAL_SUCCESS_BOX_LAYER_ID = "success-box";
  const SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID = "success-testimonial";
  const SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID = "success-brand";
  const SOCIAL_SUCCESS_CONTACT_LAYER_ID = "success-contact";
  const SOCIAL_SUCCESS_BG_LAYER_ID = `${SOCIAL_IMAGE_LAYER_PREFIX}success-bg`;
  const SOCIAL_SUCCESS_BRAND_IMAGE_LAYER_ID = `${SOCIAL_IMAGE_LAYER_PREFIX}success-brand`;
  const SOCIAL_PHOTO_FOOTER_IMAGE_LAYER_ID = `${SOCIAL_IMAGE_LAYER_PREFIX}photo-footer-main`;
  const SOCIAL_BAND_OVERLAY_LAYER_ID = "band-overlay";
  const SOCIAL_BAND_BRAND_LAYER_ID = "band-brand";
  const SOCIAL_BAND_CONTACT_A_LAYER_ID = "band-contact-a";
  const SOCIAL_BAND_CONTACT_B_LAYER_ID = "band-contact-b";
  const SOCIAL_BAND_TEXT_LAYER_IDS = [
    "band-text-1",
    "band-text-2",
    "band-text-3",
    "band-text-4",
  ];
  const SOCIAL_BAND_LAYER_IDS = ["band-1", "band-2", "band-3", "band-4"];
  const SOCIAL_ANNOUNCEMENT_DATE_FONT_PT = 30;
  const SOCIAL_ANNOUNCEMENT_LAYER_ORDER = [
    "cta",
    "start",
    SOCIAL_DATE_BOX_LAYER_ID,
    SOCIAL_CONTACT_LAYER_ID,
    SOCIAL_BRAND_LAYER_ID,
    SOCIAL_FOOTER_LAYER_ID,
    "headline",
    SOCIAL_HEADER_LAYER_ID,
    "media",
    SOCIAL_BG_LAYER_ID,
  ];
  const SOCIAL_SUCCESS_STORY_IMAGE_COUNT = 10;
  const SUCCESS_STORY_RATIO_KEY_BY_ASPECT = {
    "1:1": "1-1",
    "4:5": "4-5",
    "16:9": "16-9",
    "9:16": "9-16",
  } as const;
  const formatBusinessPhone = (value) => {
    const digits = String(value ?? "").replace(/\D/g, "");
    const normalized =
      digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
    if (normalized.length !== 10) return "";
    return `(${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6)}`;
  };
  const resolveSuccessStoryContactText = ({
    phoneText,
    emailText,
  }: {
    phoneText: string;
    emailText: string;
  }) => {
    const options = [String(phoneText ?? "").trim(), String(emailText ?? "").trim()].filter(
      Boolean,
    );
    if (!options.length) return "#tutoring";
    return options[Math.floor(Math.random() * options.length)] ?? "#tutoring";
  };
  const socialBrandLogoUrl = String(companyDraft?.company_logo_url ?? "").trim();
  const socialHasBrandLogo = socialBrandLogoUrl.length > 0;
  const socialCompanyNameText = String(org?.business_name ?? "").trim() || "Company Name";
  const socialBusinessPhoneText = formatBusinessPhone(
    businessForm?.formData?.business_phone ?? org?.business_phone ?? "",
  );
  const socialBusinessEmailText = String(
    businessForm?.formData?.business_email ?? org?.business_email ?? "",
  ).trim();
  const socialFooterContactText =
    socialBusinessPhoneText || socialBusinessEmailText || "#tutoring";
  const resolveTemplateCallToActionText = ({
    templateStyle,
    callToAction,
    priceDetail,
  }: {
    templateStyle: string;
    callToAction: string;
    priceDetail: string;
  }) => {
    if (templateStyle === "Seasonal promo") {
      const seasonalPriceText = String(priceDetail ?? "").trim();
      return seasonalPriceText || "Price / Offer";
    }
    return String(callToAction ?? "").trim();
  };
  const isBoldHeadlineAnnouncementTemplate = ({
    templateStyle,
    layoutPreset,
  }: {
    templateStyle: string;
    layoutPreset: string;
  }) =>
    layoutPreset === "Bold headline" &&
    (templateStyle === "Class announcement" ||
      templateStyle === "Enrollment reminder" ||
      templateStyle === "Seasonal promo");
  const isAnnouncementLikeTemplateStyle = (templateStyle: string) =>
    templateStyle === "Class announcement" ||
    templateStyle === "Enrollment reminder" ||
    templateStyle === "Seasonal promo";
  const resolveEnrollmentSwappedOfferText = ({
    templateStyle,
    headlineText,
    callToAction,
    priceDetail,
    startDate,
    productName,
  }: {
    templateStyle: string;
    headlineText: string;
    callToAction: string;
    priceDetail: string;
    startDate: string;
    productName: string;
  }) => {
    const headline = String(headlineText ?? "").trim();
    const cta = resolveTemplateCallToActionText({
      templateStyle,
      callToAction,
      priceDetail,
    });
    if (templateStyle !== "Enrollment reminder") {
      return { headline, cta };
    }
    const swappedHeadline = cta || headline || String(startDate ?? "").trim() || "Call to action";
    const swappedCta = headline || cta || String(productName ?? "").trim() || "Add Headline";
    return {
      headline: swappedHeadline,
      cta: swappedCta,
    };
  };
  const isEnrollmentReminderBoldHeadlineTemplate = ({
    templateStyle,
    layoutPreset,
  }: {
    templateStyle: string;
    layoutPreset: string;
  }) =>
    layoutPreset === "Bold headline" && templateStyle === "Enrollment reminder";
  const resolveBoldHeadlinePrimaryText = ({
    templateStyle,
    layoutPreset,
    headlineText,
    callToAction,
    priceDetail,
    startDate,
    productName,
  }: {
    templateStyle: string;
    layoutPreset: string;
    headlineText: string;
    callToAction: string;
    priceDetail: string;
    startDate: string;
    productName: string;
  }) => {
    if (
      isEnrollmentReminderBoldHeadlineTemplate({
        templateStyle,
        layoutPreset,
      })
    ) {
      return resolveEnrollmentSwappedOfferText({
        templateStyle,
        headlineText,
        callToAction,
        priceDetail,
        startDate,
        productName,
      }).headline;
    }
    const headline = String(headlineText ?? "").trim();
    if (headline) return headline;
    const product = String(productName ?? "").trim();
    return product || "Add Headline";
  };
  const resolveBoldHeadlineFooterText = ({
    templateStyle,
    layoutPreset,
    headlineText,
    callToAction,
    priceDetail,
    startDate,
    productName,
    announcementFooterText,
  }: {
    templateStyle: string;
    layoutPreset: string;
    headlineText: string;
    callToAction: string;
    priceDetail: string;
    startDate: string;
    productName: string;
    announcementFooterText: string;
  }) => {
    if (
      isEnrollmentReminderBoldHeadlineTemplate({
        templateStyle,
        layoutPreset,
      })
    ) {
      return resolveEnrollmentSwappedOfferText({
        templateStyle,
        headlineText,
        callToAction,
        priceDetail,
        startDate,
        productName,
      }).cta;
    }
    return String(announcementFooterText ?? "");
  };
  const normalizeMdyShortDate = (value) => {
    const v = String(value ?? "").trim();
    if (!v) return "";
    const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return v;
    const mm = Number.parseInt(m[2] ?? "0", 10);
    const dd = Number.parseInt(m[3] ?? "0", 10);
    const yy = Number.parseInt((m[1] ?? "00").slice(-2), 10);
    if (!mm || !dd) return v;
    return `${mm}/${dd}/${yy.toString().padStart(2, "0")}`;
  };
  const resolvePhotoFooterHeadlineText = ({
    templateStyle,
    headlineText,
    locationText,
    startDate,
    endDate,
  }) => {
    const headline = String(headlineText ?? "").trim();
    if (headline) return headline;

    const isAnnouncementTemplate = isAnnouncementLikeTemplateStyle(
      String(templateStyle ?? ""),
    );
    if (isAnnouncementTemplate) {
      const start = normalizeMdyShortDate(startDate);
      const end = normalizeMdyShortDate(endDate);
      if (start && end) return `${start} - ${end}`;
      if (start) return `Starting - ${start}`;
      return "#tutoring";
    }

    const location = String(locationText ?? "").trim();
    if (location) return location;
    return "#tutoring";
  };
  const buildPhotoFooterContactText = ({
    phoneText,
    emailText,
  }: {
    phoneText: string;
    emailText: string;
  }) => {
    const phone = String(phoneText ?? "").trim();
    const email = String(emailText ?? "").trim();
    if (phone && email) return `${phone}${" ".repeat(5)}${email}`;
    return phone || email || "#tutoring";
  };
  const resolvePhotoFooterDateLineText = ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => {
    const start = normalizeMdyShortDate(startDate);
    const end = normalizeMdyShortDate(endDate);
    if (start && end) return `${start} - ${end}`;
    if (start) return `Starting - ${start}`;
    return "Starting - Soon";
  };
  const resolvePhotoFooterLocationPriceText = ({
    locationText,
    priceText,
  }: {
    locationText: string;
    priceText: string;
  }) => {
    const location = String(locationText ?? "").trim();
    const price = String(priceText ?? "").trim();
    if (location && price) return `${location}${" ".repeat(5)}${price}`;
    return location || price || "";
  };
  const resolvePhotoFooterBottomLineText = ({
    mode,
    callToAction,
    phoneText,
    emailText,
  }: {
    mode: "cta" | "contact";
    callToAction: string;
    phoneText: string;
    emailText: string;
  }) => {
    const cta = String(callToAction ?? "").trim();
    const contact = buildPhotoFooterContactText({
      phoneText,
      emailText,
    });
    if (mode === "cta") {
      return cta || contact;
    }
    return contact;
  };
  const computeAnnouncementFooterInfo = ({
    source,
    ageRange,
    locationDetail,
    callToAction,
    fallbackMode,
    fallbackName,
  }) => {
    const ageText = String(ageRange ?? "").trim();
    const locationText = String(locationDetail ?? "").trim();
    const ctaText = String(callToAction ?? "").trim();
    const allEmpty = !ageText && !locationText && !ctaText;

    if (!allEmpty) {
      if (source === "age") return { text: ageText, isLocation: false };
      if (source === "location") return { text: locationText, isLocation: true };
      return { text: ctaText, isLocation: false };
    }

    const cleanFallbackName = String(fallbackName ?? "").trim();
    if (fallbackMode === "name") {
      return {
        text: cleanFallbackName || "#tutoring",
        isLocation: false,
      };
    }
    if (fallbackMode === "hash-name") {
      return {
        text: cleanFallbackName
          ? `#${cleanFallbackName.replace(/^#+/, "")}`
          : "#tutoring",
        isLocation: false,
      };
    }
    if (fallbackMode === "tutoring") {
      return { text: "#tutoring", isLocation: false };
    }
    return { text: "", isLocation: false };
  };
  const socialAnnouncementFallbackNames = useMemo(
    () =>
      [
        socialSelectedProduct?.product_name,
        socialSelectedService?.display_name ?? socialSelectedService?.service_code,
        socialSelectedSubject?.subject_name,
        socialSelectedTopic?.topic_name,
      ]
        .map((v) => String(v ?? "").trim())
        .filter(Boolean),
    [
      socialSelectedProduct?.product_name,
      socialSelectedService?.display_name,
      socialSelectedService?.service_code,
      socialSelectedSubject?.subject_name,
      socialSelectedTopic?.topic_name,
    ],
  );
  const socialEffectiveFooterInfoSource =
    socialDraft.template_style === "Seasonal promo"
      ? "cta"
      : socialFooterInfoSource;
  const socialAnnouncementFooterInfo = useMemo(
    () =>
      computeAnnouncementFooterInfo({
        source: socialEffectiveFooterInfoSource,
        ageRange: socialDraft.age_range,
        locationDetail: socialDraft.location_detail,
        callToAction: resolveTemplateCallToActionText({
          templateStyle: socialDraft.template_style,
          callToAction: socialDraft.call_to_action,
          priceDetail: socialDraft.price_detail,
        }),
        fallbackMode: socialFooterInfoEmptyMode,
        fallbackName: socialFooterInfoEmptyName,
      }),
    [
      socialEffectiveFooterInfoSource,
      socialFooterInfoSource,
      socialFooterInfoEmptyMode,
      socialFooterInfoEmptyName,
      socialDraft.age_range,
      socialDraft.location_detail,
      socialDraft.call_to_action,
      socialDraft.price_detail,
      socialDraft.template_style,
    ],
  );
  const SOCIAL_ANNOUNCEMENT_FOOTER_INFO_FONT_PT = 175;
  const resolveAnnouncementFooterInfoFontPt = (_value: string) =>
    SOCIAL_ANNOUNCEMENT_FOOTER_INFO_FONT_PT;

  const measureAnnouncementFooterInfoHeight = ({
    text,
    fontSize = SOCIAL_ANNOUNCEMENT_FOOTER_INFO_FONT_PT,
    footerTopY = 920,
    footerGap = 25,
  }: {
    text: string;
    fontSize?: number;
    footerTopY?: number;
    footerGap?: number;
  }) => {
    const measured = measureWrappedSocialText({
      text: String(text ?? ""),
      fontSize: Math.max(8, Number(fontSize) || SOCIAL_ANNOUNCEMENT_FOOTER_INFO_FONT_PT),
      fontWeight: 800,
      fontFamily:
        socialFontFamily && socialFontFamily !== "inherit"
          ? socialFontFamily
          : "Poppins, sans-serif",
      maxWidth: 1000,
      minWidth: 1000,
      paddingX: 16,
      paddingY: 14,
      lineHeightMultiplier: 1.1,
      outlineWidth: 0,
    });
    const shadowPad = Math.max(56, Math.ceil((Number(fontSize) || 100) * 0.9));
    const rawHeight = measured.height + shadowPad; // extra room for shadow/descenders
    const maxVisibleHeight = Math.max(160, Math.floor(footerTopY - footerGap));
    return clampLayerValue(rawHeight, 160, maxVisibleHeight);
  };
  const resolveAnnouncementFooterInfoFrame = ({
    text,
    fontSize = 100,
    footerFrame,
  }: {
    text: string;
    fontSize?: number;
    footerFrame?: { x?: number; y?: number; width?: number; height?: number } | null;
  }) => {
    const normalizedFooterY = footerFrame?.y ?? 920;
    const aspectWidth = Number(socialAspect?.width) || 1;
    const aspectHeight = Number(socialAspect?.height) || 1;
    const normalizedScaleY = Math.max(0.01, aspectHeight / aspectWidth);
    const footerGap = Math.max(1, 25 / normalizedScaleY);
    const height = measureAnnouncementFooterInfoHeight({
      text,
      fontSize,
      footerTopY: normalizedFooterY,
      footerGap,
    });
    const y = Math.max(0, normalizedFooterY - footerGap - height);
    return {
      x: 0,
      y,
      width: 1000,
      height,
    };
  };
  const resolveAnnouncementFooterFrame = () => {
    const width = Number(socialAspect?.width) || 1;
    const height = Number(socialAspect?.height) || 1;
    const normalizedScaleY = Math.max(0.01, height / width);
    const aspectDefaults = announcementDefaultsByAspect(socialDraft.aspect_ratio);
    const footerHeightPt = Math.max(20, Number(aspectDefaults.footerHeight) || 80);
    const footerHeight = clampLayerValue(
      Math.round(footerHeightPt / normalizedScaleY),
      24,
      220,
    );
    const y = clampLayerValue(1000 - footerHeight, 0, 1000 - footerHeight);
    return {
      x: 0,
      y,
      width: 1000,
      height: footerHeight,
    };
  };
  const resolveAnnouncementBrandLogoFrame = () => {
    const width = Number(socialAspect?.width) || 1;
    const height = Number(socialAspect?.height) || 1;
    const normalizedScaleY = Math.max(0.01, height / width);
    const logoHeight = clampLayerValue(Math.round(70 / normalizedScaleY), 20, 200);
    const bottomPadding = Math.max(1, Math.round(5 / normalizedScaleY));
    const y = clampLayerValue(1000 - bottomPadding - logoHeight, 0, 1000 - logoHeight);
    return {
      x: 20,
      y,
      width: 960,
      height: logoHeight,
    };
  };
  const isSocialImageLayer = (layerId) =>
    layerId === "media" ||
    (layerId === SOCIAL_BRAND_LAYER_ID && socialHasBrandLogo) ||
    (layerId === SOCIAL_BAND_BRAND_LAYER_ID && socialHasBrandLogo) ||
    String(layerId || "").startsWith(SOCIAL_IMAGE_LAYER_PREFIX);
  const isSocialCustomTextLayer = (layerId) =>
    String(layerId || "").startsWith(SOCIAL_TEXT_LAYER_PREFIX);
  const isSocialShapeLayer = (layerId) =>
    layerId === SOCIAL_BG_LAYER_ID ||
    layerId === SOCIAL_HEADER_LAYER_ID ||
    layerId === SOCIAL_FOOTER_LAYER_ID ||
    layerId === SOCIAL_DATE_BOX_LAYER_ID ||
    layerId === SOCIAL_SUCCESS_BOX_LAYER_ID ||
    layerId === SOCIAL_BAND_OVERLAY_LAYER_ID ||
    SOCIAL_BAND_LAYER_IDS.includes(String(layerId || "")) ||
    String(layerId || "").startsWith(SOCIAL_SHAPE_LAYER_PREFIX);
  const buildSocialShapeLayerId = () =>
    `${SOCIAL_SHAPE_LAYER_PREFIX}${Date.now()}-${socialShapeCounterRef.current++}`;
  const buildSocialImageLayerId = () =>
    `${SOCIAL_IMAGE_LAYER_PREFIX}${Date.now()}-${socialImageCounterRef.current++}`;
  const buildSocialTextLayerId = () =>
    `${SOCIAL_TEXT_LAYER_PREFIX}${Date.now()}-${socialTextCounterRef.current++}`;
  const detectSocialMediaTypeFromUrl = (url) => {
    const lower = String(url || "").toLowerCase();
    if (lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.endsWith(".webm")) {
      return "VIDEO";
    }
    return "PHOTO";
  };
  const getSocialShapeStyleMeta = (layerId) =>
    socialShapeStyles[layerId] ?? {
      kind: socialShapeKind,
      color: socialShapeColor,
      opacity: socialShapeOpacity,
    };
  const socialShapeStyleFromMeta = (frame, meta) => {
    const kind = meta?.kind ?? "rect";
    const color = meta?.color ?? "#3aa6d9";
    const gradient = String(meta?.gradient ?? "").trim();
    const opacity = Math.max(0, Math.min(100, meta?.opacity ?? 60)) / 100;
    const transforms = [];
    if (meta?.flipX) transforms.push("scaleX(-1)");
    if (meta?.flipY) transforms.push("scaleY(-1)");
    const base = {
      backgroundColor: color,
      ...(gradient
        ? {
            backgroundImage: gradient,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }
        : null),
      opacity,
      ...socialFrameToStyle(frame),
      ...(transforms.length
        ? {
            transform: transforms.join(" "),
            transformOrigin: "center center",
          }
        : null),
    };
    if (kind === "circle") {
      return { ...base, borderRadius: "9999px" };
    }
    if (kind === "triangle") {
      return {
        ...base,
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      };
    }
    if (kind === "diamond") {
      return {
        ...base,
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      };
    }
    if (kind === "arrow") {
      return {
        ...base,
        clipPath:
          "polygon(0% 20%, 68% 20%, 68% 0%, 100% 50%, 68% 100%, 68% 80%, 0% 80%)",
      };
    }
    if (kind === "banner") {
      return {
        ...base,
        clipPath:
          "polygon(0% 0%, 100% 0%, 100% 35%, 92% 50%, 100% 65%, 100% 100%, 0% 100%, 0% 65%, 8% 50%, 0% 35%)",
      };
    }
    if (kind === "rectangle") {
      return { ...base, borderRadius: "0px" };
    }
    return { ...base, borderRadius: "14px" };
  };

  const applySocialShapeKind = (kind) => {
    setSocialShapeKind(kind);
    if (isSocialShapeLayer(socialSelectedLayer)) {
      setSocialShapeStyles((prev) => ({
        ...prev,
        [socialSelectedLayer]: {
          ...getSocialShapeStyleMeta(socialSelectedLayer),
          kind,
        },
      }));
    }
  };

  const announcementDefaultsByAspect = (aspectRatio) => {
    switch (aspectRatio) {
      case "16:9":
        return {
          headlineFont: 150,
          dateFont: 60,
          dateWidth: 260,
          dateHeight: 190,
          dateOffsetY: 38,
          dateMarginX: 42,
          footerInfoFont: 175,
          footerHeight: 80,
          flipDateBoxX: false,
        };
      case "4:5":
        return {
          headlineFont: 150,
          dateFont: 60,
          dateWidth: 300,
          dateHeight: 250,
          dateOffsetY: 50,
          dateMarginX: 50,
          footerInfoFont: 175,
          footerHeight: 80,
          flipDateBoxX: false,
        };
      case "9:16":
        return {
          headlineFont: 220,
          dateFont: 80,
          dateWidth: 300,
          dateHeight: 250,
          dateOffsetY: 50,
          dateMarginX: 50,
          footerInfoFont: 175,
          footerHeight: 100,
          flipDateBoxX: true,
        };
      case "1:1":
      default:
        return {
          headlineFont: 125,
          dateFont: 60,
          dateWidth: 300,
          dateHeight: 250,
          dateOffsetY: 50,
          dateMarginX: 50,
          footerInfoFont: 175,
          footerHeight: 80,
          flipDateBoxX: false,
        };
    }
  };

  const fitWrappedTextFontSize = ({
    text,
    frame,
    maxFont = 96,
    minFont = 14,
    paddingX = 20,
    paddingY = 20,
    fontWeight = 700,
    lineHeightMultiplier = 1.12,
  }) => {
    const safeText = String(text ?? "").trim();
    if (!safeText) return minFont;
    if (!frame) return minFont;
    let low = Math.max(8, Math.floor(minFont));
    let high = Math.max(low, Math.floor(maxFont));
    let best = low;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const measured = measureWrappedSocialText({
        text: safeText,
        fontSize: mid,
        fontWeight,
        fontFamily:
          socialFontFamily && socialFontFamily !== "inherit"
            ? socialFontFamily
            : "Poppins, sans-serif",
        maxWidth: Math.max(40, Number(frame.width ?? 0)),
        minWidth: Math.max(40, Number(frame.width ?? 0)),
        paddingX,
        paddingY,
        lineHeightMultiplier,
        outlineWidth: 0,
        tightHeight: true,
      });
      if (
        measured.width <= Math.max(40, Number(frame.width ?? 0)) &&
        measured.height <= Math.max(20, Number(frame.height ?? 0))
      ) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return clampLayerValue(best, minFont, maxFont);
  };

  const chooseContrastingTextColor = (r, g, b) => {
    const luminance = r * 0.2126 + g * 0.7152 + b * 0.0722;
    return luminance >= 150 ? "#111111" : "#ffffff";
  };

  const resolveSuccessStorySideTextColors = async ({
    imageUrl,
    leftFrame,
    rightFrame,
  }) => {
    if (typeof window === "undefined" || !imageUrl) {
      return {
        left: "#ffffff",
        right: "#ffffff",
      };
    }
    try {
      const image = await new Promise((resolve, reject) => {
        const nextImage = new Image();
        nextImage.crossOrigin = "anonymous";
        nextImage.onload = () => resolve(nextImage);
        nextImage.onerror = reject;
        nextImage.src = imageUrl;
      });
      const canvas = document.createElement("canvas");
      const width = Math.max(2, Number(image.naturalWidth) || 200);
      const height = Math.max(2, Number(image.naturalHeight) || 200);
      canvas.width = width;
      canvas.height = height;
      const ctx2d = canvas.getContext("2d");
      if (!ctx2d) {
        return {
          left: "#ffffff",
          right: "#ffffff",
        };
      }
      ctx2d.drawImage(image, 0, 0, width, height);

      const sampleColor = (frame) => {
        const sx = clampLayerValue(Math.floor((frame.x / 1000) * width), 0, width - 1);
        const sy = clampLayerValue(Math.floor((frame.y / 1000) * height), 0, height - 1);
        const sw = clampLayerValue(
          Math.floor((frame.width / 1000) * width),
          1,
          width - sx,
        );
        const sh = clampLayerValue(
          Math.floor((frame.height / 1000) * height),
          1,
          height - sy,
        );
        const { data } = ctx2d.getImageData(sx, sy, sw, sh);
        let rTotal = 0;
        let gTotal = 0;
        let bTotal = 0;
        let count = 0;
        for (let idx = 0; idx < data.length; idx += 4) {
          rTotal += data[idx] ?? 0;
          gTotal += data[idx + 1] ?? 0;
          bTotal += data[idx + 2] ?? 0;
          count += 1;
        }
        if (!count) return "#ffffff";
        return chooseContrastingTextColor(
          Math.round(rTotal / count),
          Math.round(gTotal / count),
          Math.round(bTotal / count),
        );
      };

      return {
        left: sampleColor(leftFrame),
        right: sampleColor(rightFrame),
      };
    } catch {
      return {
        left: "#ffffff",
        right: "#ffffff",
      };
    }
  };

  const generateBlankSocialPost = () => {
    setSocialInlineTextOverrides({});
    const templateStyle = SOCIAL_TEMPLATE_STYLES.includes(
      socialDraft.template_style,
    )
      ? socialDraft.template_style
      : "Class announcement";
    const layoutPreset = SOCIAL_LAYOUT_PRESETS.includes(socialDraft.layout_preset)
      ? socialDraft.layout_preset
      : "Bold headline";
    const aspectRatio = SOCIAL_ASPECT_RATIOS.some(
      (ratio) => ratio.value === socialDraft.aspect_ratio,
    )
      ? socialDraft.aspect_ratio
      : "1:1";
    const isCompanyLogoMedia = (media) => media?.id === "company-logo";
    const allImages = socialMediaOptions.filter(
      (media) => media.type === "PHOTO" && !isCompanyLogoMedia(media),
    );
    const selectedImages = (socialDraft.selected_media_ids ?? [])
      .map((id) => allImages.find((media) => media.id === id) ?? null)
      .filter(Boolean) as Array<(typeof socialMediaOptions)[number]>;
    const mediaPool = selectedImages.length > 0 ? selectedImages : allImages;
    const chosenMedia =
      mediaPool.length === 0
        ? null
        : mediaPool[Math.floor(Math.random() * mediaPool.length)] ?? null;

    if (layoutPreset === "Blank canvas" && templateStyle !== "Success story") {
      clearSocialCanvasState();
      setSocialDraft((prev) => ({
        ...prev,
        template_style: templateStyle,
        layout_preset: layoutPreset,
        aspect_ratio: aspectRatio,
        selected_template_id: `${aspectRatio}|${layoutPreset}`,
      }));
      setStatus("Blank canvas generated.");
      return;
    }

    if (templateStyle === "Success story") {
      clearSocialCanvasState();

      const ratioKey =
        SUCCESS_STORY_RATIO_KEY_BY_ASPECT[aspectRatio] ??
        SUCCESS_STORY_RATIO_KEY_BY_ASPECT["1:1"];
      const randomIndex =
        Math.floor(Math.random() * SOCIAL_SUCCESS_STORY_IMAGE_COUNT) + 1;
      const successBgUrl = `/social-template-presets/testimonial_template_${ratioKey}_${randomIndex}.png`;
      const hasBrandLogo = Boolean(socialHasBrandLogo && socialBrandLogoUrl);
      const brandSide = Math.random() < 0.5 ? "left" : "right";
      const contactSide = brandSide === "left" ? "right" : "left";
      const leftFrame = { x: 25, y: 875, width: 450, height: 100 };
      const rightFrame = { x: 525, y: 875, width: 450, height: 100 };
      const brandFrame = brandSide === "left" ? leftFrame : rightFrame;
      const contactFrame = contactSide === "left" ? leftFrame : rightFrame;
      const successBoxFrame = { x: 80, y: 80, width: 840, height: 770 };
      const testimonialFrame = { ...successBoxFrame };
      const testimonialText =
        String(socialDraft.extra_notes ?? "").trim() ||
        "Share your success story here.";
      const companyDisplayName = String(socialCompanyNameText ?? "").trim() || "Company Name";
      const contactText = resolveSuccessStoryContactText({
        phoneText: socialBusinessPhoneText,
        emailText: socialBusinessEmailText,
      });

      const testimonialFont = fitWrappedTextFontSize({
        text: testimonialText,
        frame: testimonialFrame,
        maxFont: 88,
        minFont: 20,
        paddingX: 28,
        paddingY: 24,
        fontWeight: 700,
        lineHeightMultiplier: 1.15,
      });
      const contactFont = 30;
      const brandTextFont = fitBandSingleLineFontSize({
        text: companyDisplayName,
        frame: brandFrame,
        maxFont: 70,
        minFont: 16,
        paddingX: 16,
        paddingY: 8,
        fontWeight: 700,
      });

      setSocialSuccessBrandSide(brandSide);
      setSocialSuccessContactText(contactText);
      setSocialSuccessSideTextColors({
        left: "#ffffff",
        right: "#ffffff",
      });
      const colorReqId = socialSuccessColorRequestRef.current + 1;
      socialSuccessColorRequestRef.current = colorReqId;
      void resolveSuccessStorySideTextColors({
        imageUrl: successBgUrl,
        leftFrame,
        rightFrame,
      }).then((nextColors) => {
        if (socialSuccessColorRequestRef.current !== colorReqId) return;
        setSocialSuccessSideTextColors({
          left: String(nextColors?.left ?? "#ffffff"),
          right: String(nextColors?.right ?? "#ffffff"),
        });
      });

      const layerOrder = hasBrandLogo
        ? [
            SOCIAL_SUCCESS_CONTACT_LAYER_ID,
            SOCIAL_SUCCESS_BRAND_IMAGE_LAYER_ID,
            SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID,
            SOCIAL_SUCCESS_BOX_LAYER_ID,
            SOCIAL_SUCCESS_BG_LAYER_ID,
          ]
        : [
            SOCIAL_SUCCESS_CONTACT_LAYER_ID,
            SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID,
            SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID,
            SOCIAL_SUCCESS_BOX_LAYER_ID,
            SOCIAL_SUCCESS_BG_LAYER_ID,
          ];

      setSocialLayerOrder(layerOrder);
      setSocialLayerVisible({
        [SOCIAL_SUCCESS_BG_LAYER_ID]: true,
        [SOCIAL_SUCCESS_BOX_LAYER_ID]: true,
        [SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID]: true,
        [SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID]: !hasBrandLogo,
        [SOCIAL_SUCCESS_BRAND_IMAGE_LAYER_ID]: hasBrandLogo,
        [SOCIAL_SUCCESS_CONTACT_LAYER_ID]: true,
      });
      setSocialLayerLocked({
        [SOCIAL_SUCCESS_BG_LAYER_ID]: false,
        [SOCIAL_SUCCESS_BOX_LAYER_ID]: false,
        [SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID]: false,
        [SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID]: false,
        [SOCIAL_SUCCESS_BRAND_IMAGE_LAYER_ID]: false,
        [SOCIAL_SUCCESS_CONTACT_LAYER_ID]: false,
      });
      setSocialLayerFrames({
        [SOCIAL_SUCCESS_BG_LAYER_ID]: { x: 0, y: 0, width: 1000, height: 1000 },
        [SOCIAL_SUCCESS_BOX_LAYER_ID]: successBoxFrame,
        [SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID]: testimonialFrame,
        [SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID]: brandFrame,
        [SOCIAL_SUCCESS_BRAND_IMAGE_LAYER_ID]: brandFrame,
        [SOCIAL_SUCCESS_CONTACT_LAYER_ID]: contactFrame,
      });
      setSocialShapeStyles({
        [SOCIAL_SUCCESS_BOX_LAYER_ID]: {
          kind: "rectangle",
          color: "#ffffff",
          opacity: 75,
        },
      });
      setSocialImageLayers(
        hasBrandLogo
          ? {
              [SOCIAL_SUCCESS_BG_LAYER_ID]: {
                id: SOCIAL_SUCCESS_BG_LAYER_ID,
                url: successBgUrl,
                type: "PHOTO",
              },
              [SOCIAL_SUCCESS_BRAND_IMAGE_LAYER_ID]: {
                id: SOCIAL_SUCCESS_BRAND_IMAGE_LAYER_ID,
                url: socialBrandLogoUrl,
                type: detectSocialMediaTypeFromUrl(socialBrandLogoUrl),
              },
            }
          : {
              [SOCIAL_SUCCESS_BG_LAYER_ID]: {
                id: SOCIAL_SUCCESS_BG_LAYER_ID,
                url: successBgUrl,
                type: "PHOTO",
              },
            },
      );
      setSocialTextFontSizes((prev) => ({
        ...prev,
        [SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID]: testimonialFont,
        [SOCIAL_SUCCESS_CONTACT_LAYER_ID]: contactFont,
        [SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID]: brandTextFont,
      }));
      setSocialSelectedImageId("");
      setSocialPreviewOverrideUrl("");
      setSocialPreviewDropActive(false);
      setSocialDraggingLayer("");
      setSocialSelectedLayer(SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID);
      setSocialToolTarget(SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID);
      setSocialToolFontSize(testimonialFont);
      setSocialToolAlignX("left");
      setSocialToolAlignY("top");
      setSocialToolColor("#111111");
      setSocialDraft((prev) => ({
        ...prev,
        template_style: templateStyle,
        layout_preset: layoutPreset,
        aspect_ratio: aspectRatio,
        selected_template_id: `${aspectRatio}|${layoutPreset}`,
      }));
      setStatus("Success story generated.");
      return;
    }

    if (layoutPreset === "Band rows") {
      const isSeasonalPromoTemplate = templateStyle === "Seasonal promo";
      const bandColorChoices = [
        "#ef4444",
        "#f97316",
        "#f59e0b",
        "#eab308",
        "#22c55e",
        "#14b8a6",
        "#0ea5e9",
        "#6366f1",
        "#8b5cf6",
        "#ec4899",
      ];
      const randomBandColor = () =>
        bandColorChoices[Math.floor(Math.random() * bandColorChoices.length)] ??
        "#0ea5e9";
      const randomOverlayColor = randomBandColor();
      const randomBandAlign = Math.random() < 0.5 ? "left" : "center";
      const normalizeMdyShort = (value) => {
        const v = String(value ?? "").trim();
        if (!v) return "";
        const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!m) return v;
        const mm = Number.parseInt(m[2] ?? "0", 10);
        const dd = Number.parseInt(m[3] ?? "0", 10);
        const yy = Number.parseInt((m[1] ?? "00").slice(-2), 10);
        if (!mm || !dd) return v;
        return `${mm}/${dd}/${yy.toString().padStart(2, "0")}`;
      };

      const bandRowsSwappedText = resolveEnrollmentSwappedOfferText({
        templateStyle,
        headlineText: socialDraft.headline,
        callToAction: socialDraft.call_to_action,
        priceDetail: socialDraft.price_detail,
        startDate: socialDraft.start_date,
        productName: socialSelectedProduct?.product_name,
      });
      const headlineText = String(
        bandRowsSwappedText.headline ||
          socialSelectedProduct?.product_name ||
          "Add Headline",
      ).trim();
      const startShort = normalizeMdyShort(socialDraft.start_date);
      const endShort = normalizeMdyShort(socialDraft.end_date);
      const priceText = String(socialDraft.price_detail ?? "").trim();
      const dateCore =
        startShort && endShort
          ? `${startShort} - ${endShort}`
          : startShort
            ? `Starting ${startShort}`
            : "";
      const band2Text = isSeasonalPromoTemplate
        ? dateCore
        : [dateCore, priceText ? `${" ".repeat(6)}${priceText}` : ""]
            .filter(Boolean)
            .join("");
      const locationText = String(socialDraft.location_detail ?? "").trim();
      const ageText = String(socialDraft.age_range ?? "").trim();
      const ctaText = String(bandRowsSwappedText.cta ?? "").trim();
      const band3Text = ageText || locationText || "";
      const band4Text = ctaText || (band3Text === locationText ? "" : locationText) || "";

      const contactConfig = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3;
      const swapContacts = Math.random() < 0.5;
      const phoneText =
        String(socialBusinessPhoneText ?? "").trim() ||
        String(socialBusinessEmailText ?? "").trim() ||
        "#tutoring";
      const emailText =
        String(socialBusinessEmailText ?? "").trim() ||
        String(socialBusinessPhoneText ?? "").trim() ||
        "#tutoring";

      const contactMargin = 25;
      const contactHeight = 100;
      const sideWidth = 450;
      const centerWidth = 900;
      const leftX = contactMargin;
      const rightX = 1000 - contactMargin - sideWidth;
      const centerX = 50;
      const topY = contactMargin;
      const bottomY = 1000 - contactMargin - contactHeight;

      let brandFrame = { x: centerX, y: topY, width: centerWidth, height: contactHeight };
      let brandAlign: "left" | "center" | "right" = "center";
      let contactAFrame = { x: leftX, y: bottomY, width: sideWidth, height: contactHeight };
      let contactBFrame = { x: rightX, y: bottomY, width: sideWidth, height: contactHeight };
      let contactAText = swapContacts ? emailText : phoneText;
      let contactBText = swapContacts ? phoneText : emailText;
      let contactAAlign: "left" | "center" | "right" = "left";
      let contactBAlign: "left" | "center" | "right" = "right";

      if (contactConfig === 2) {
        brandFrame = { x: leftX, y: topY, width: sideWidth, height: contactHeight };
        brandAlign = "left";
        contactAFrame = { x: rightX, y: topY, width: sideWidth, height: contactHeight };
        contactBFrame = { x: centerX, y: bottomY, width: centerWidth, height: contactHeight };
        contactAText = phoneText;
        contactBText = emailText;
        contactAAlign = "right";
        contactBAlign = "center";
      } else if (contactConfig === 3) {
        brandFrame = { x: centerX, y: bottomY, width: centerWidth, height: contactHeight };
        brandAlign = "center";
        contactAFrame = { x: leftX, y: topY, width: sideWidth, height: contactHeight };
        contactBFrame = { x: rightX, y: topY, width: sideWidth, height: contactHeight };
        contactAText = swapContacts ? emailText : phoneText;
        contactBText = swapContacts ? phoneText : emailText;
        contactAAlign = "left";
        contactBAlign = "right";
      }

      const band1Frame = { x: 0, y: 156.25, width: 1000, height: 125 };
      const band2Frame = { x: 0, y: 343.75, width: 1000, height: 125 };
      const band3Frame = { x: 0, y: 531.25, width: 1000, height: 125 };
      const band4Frame = { x: 0, y: 718.75, width: 1000, height: 125 };
      const bandFrames = {
        "band-1": band1Frame,
        "band-2": band2Frame,
        "band-3": band3Frame,
        "band-4": band4Frame,
        [SOCIAL_BAND_TEXT_LAYER_IDS[0]]: { ...band1Frame },
        [SOCIAL_BAND_TEXT_LAYER_IDS[1]]: { ...band2Frame },
        [SOCIAL_BAND_TEXT_LAYER_IDS[2]]: { ...band3Frame },
        [SOCIAL_BAND_TEXT_LAYER_IDS[3]]: { ...band4Frame },
        [SOCIAL_BAND_BRAND_LAYER_ID]: brandFrame,
        [SOCIAL_BAND_CONTACT_A_LAYER_ID]: contactAFrame,
        [SOCIAL_BAND_CONTACT_B_LAYER_ID]: contactBFrame,
        [SOCIAL_BAND_OVERLAY_LAYER_ID]: {
          x: 0,
          y: 0,
          width: 1000,
          height: 1000,
        },
      };
      const bandStyles = {
        [SOCIAL_BAND_OVERLAY_LAYER_ID]: {
          kind: "rectangle",
          color: randomOverlayColor,
          opacity: 25,
        },
        "band-1": { kind: "rectangle", color: randomBandColor(), opacity: 60 },
        "band-2": { kind: "rectangle", color: randomBandColor(), opacity: 60 },
        "band-3": { kind: "rectangle", color: randomBandColor(), opacity: 60 },
        "band-4": { kind: "rectangle", color: randomBandColor(), opacity: 60 },
      };
      const bandLayerOrderBase = [
        SOCIAL_BAND_CONTACT_A_LAYER_ID,
        SOCIAL_BAND_CONTACT_B_LAYER_ID,
        SOCIAL_BAND_BRAND_LAYER_ID,
        ...SOCIAL_BAND_TEXT_LAYER_IDS,
        ...SOCIAL_BAND_LAYER_IDS,
        SOCIAL_BAND_OVERLAY_LAYER_ID,
      ];
      setSocialLayerOrder(
        chosenMedia ? [...bandLayerOrderBase, "media"] : [...bandLayerOrderBase],
      );
      setSocialLayerVisible({
        media: Boolean(chosenMedia),
        [SOCIAL_BAND_OVERLAY_LAYER_ID]: true,
        [SOCIAL_BAND_BRAND_LAYER_ID]: true,
        [SOCIAL_BAND_CONTACT_A_LAYER_ID]: true,
        [SOCIAL_BAND_CONTACT_B_LAYER_ID]: true,
        [SOCIAL_BAND_TEXT_LAYER_IDS[0]]: true,
        [SOCIAL_BAND_TEXT_LAYER_IDS[1]]: true,
        [SOCIAL_BAND_TEXT_LAYER_IDS[2]]: true,
        [SOCIAL_BAND_TEXT_LAYER_IDS[3]]: true,
        "band-1": true,
        "band-2": true,
        "band-3": true,
        "band-4": true,
      });
      setSocialLayerLocked({
        media: false,
        [SOCIAL_BAND_OVERLAY_LAYER_ID]: false,
        [SOCIAL_BAND_BRAND_LAYER_ID]: false,
        [SOCIAL_BAND_CONTACT_A_LAYER_ID]: false,
        [SOCIAL_BAND_CONTACT_B_LAYER_ID]: false,
        [SOCIAL_BAND_TEXT_LAYER_IDS[0]]: false,
        [SOCIAL_BAND_TEXT_LAYER_IDS[1]]: false,
        [SOCIAL_BAND_TEXT_LAYER_IDS[2]]: false,
        [SOCIAL_BAND_TEXT_LAYER_IDS[3]]: false,
        "band-1": false,
        "band-2": false,
        "band-3": false,
        "band-4": false,
      });
      setSocialLayerFrames(bandFrames);
      setSocialShapeStyles(bandStyles);
      setSocialImageLayers(
        socialHasBrandLogo
          ? {
              [SOCIAL_BAND_BRAND_LAYER_ID]: {
                id: SOCIAL_BAND_BRAND_LAYER_ID,
                url: socialBrandLogoUrl,
                type: detectSocialMediaTypeFromUrl(socialBrandLogoUrl),
              },
            }
          : {},
      );
      const band1Font = fitBandSingleLineFontSize({
        text: headlineText,
        frame: bandFrames[SOCIAL_BAND_TEXT_LAYER_IDS[0]],
        maxFont: 220,
        minFont: 10,
      });
      const band2Font = fitBandSingleLineFontSize({
        text: band2Text,
        frame: bandFrames[SOCIAL_BAND_TEXT_LAYER_IDS[1]],
        maxFont: 220,
        minFont: 10,
      });
      const band3Font = fitBandSingleLineFontSize({
        text: band3Text,
        frame: bandFrames[SOCIAL_BAND_TEXT_LAYER_IDS[2]],
        maxFont: 220,
        minFont: 10,
      });
      const band4Font = fitBandSingleLineFontSize({
        text: band4Text,
        frame: bandFrames[SOCIAL_BAND_TEXT_LAYER_IDS[3]],
        maxFont: 220,
        minFont: 10,
      });
      const bandBrandFont = fitBandSingleLineFontSize({
        text: socialCompanyNameText,
        frame: brandFrame,
        maxFont: 110,
        minFont: 12,
      });
      const bandContactAFont = fitBandSingleLineFontSize({
        text: contactAText,
        frame: contactAFrame,
        maxFont: 110,
        minFont: 12,
      });
      const bandContactBFont = fitBandSingleLineFontSize({
        text: contactBText,
        frame: contactBFrame,
        maxFont: 110,
        minFont: 12,
      });
      setSocialTextFontSizes((prev) => ({
        ...prev,
        [SOCIAL_BAND_TEXT_LAYER_IDS[0]]: band1Font,
        [SOCIAL_BAND_TEXT_LAYER_IDS[1]]: band2Font,
        [SOCIAL_BAND_TEXT_LAYER_IDS[2]]: band3Font,
        [SOCIAL_BAND_TEXT_LAYER_IDS[3]]: band4Font,
        [SOCIAL_BAND_BRAND_LAYER_ID]: bandBrandFont,
        [SOCIAL_BAND_CONTACT_A_LAYER_ID]: bandContactAFont,
        [SOCIAL_BAND_CONTACT_B_LAYER_ID]: bandContactBFont,
      }));
      setSocialSelectedLayer(SOCIAL_BAND_TEXT_LAYER_IDS[0]);
      setSocialToolTarget(SOCIAL_BAND_TEXT_LAYER_IDS[0]);
      setSocialToolFontSize(band1Font);
      setSocialSelectedImageId(chosenMedia?.id ?? "");
      setSocialPreviewOverrideUrl(chosenMedia?.url ?? "");
      setSocialPreviewDropActive(false);
      setSocialDraggingLayer("");
      setSocialBandRowsAlign(randomBandAlign);
      setSocialBandContactConfig(contactConfig);
      setSocialBandBrandAlign(brandAlign);
      setSocialBandContactAlign({
        contactA: contactAAlign,
        contactB: contactBAlign,
      });
      setSocialBandContactText({
        contactA: contactAText,
        contactB: contactBText,
      });
      setSocialBandRowsText({
        band1: headlineText,
        band2: band2Text,
        band3: band3Text,
        band4: band4Text,
      });
      setSocialDraft((prev) => ({
        ...prev,
        template_style: templateStyle,
        layout_preset: layoutPreset,
        aspect_ratio: aspectRatio,
        selected_template_id: `${aspectRatio}|${layoutPreset}`,
      }));
      setStatus(
        chosenMedia
          ? `Band rows generated. Using image: ${chosenMedia.label}.`
          : "Band rows generated. No images available in Media & templates.",
      );
      return;
    }

    if (layoutPreset === "Photo + footer") {
      const isSeasonalPromoTemplate = templateStyle === "Seasonal promo";
      const bgColorChoices = [
        "#ef4444",
        "#f97316",
        "#f59e0b",
        "#eab308",
        "#22c55e",
        "#14b8a6",
        "#0ea5e9",
        "#6366f1",
        "#8b5cf6",
        "#ec4899",
      ];
      const randomBgColor =
        bgColorChoices[Math.floor(Math.random() * bgColorChoices.length)] ??
        "#0ea5e9";
      const randomBgColorSecondary =
        bgColorChoices[Math.floor(Math.random() * bgColorChoices.length)] ??
        "#6366f1";
      const bgGradient = `linear-gradient(to bottom right, ${randomBgColor} 0%, ${randomBgColorSecondary} 100%)`;
      const photoFooterImageLayerId = `${SOCIAL_IMAGE_LAYER_PREFIX}photo-footer-main`;
      const hasImage = Boolean(chosenMedia?.url);
      const hasBrandLogo = Boolean(socialHasBrandLogo && socialBrandLogoUrl);
      const imageFrame = { x: 50, y: 50, width: 900, height: 600 };
      const photoFooterHeadlineFont = 150;
      const photoFooterSwappedText = resolveEnrollmentSwappedOfferText({
        templateStyle,
        headlineText: socialDraft.headline,
        callToAction: socialDraft.call_to_action,
        priceDetail: socialDraft.price_detail,
        startDate: socialDraft.start_date,
        productName: socialSelectedProduct?.product_name,
      });
      const photoFooterHeadlineText = resolvePhotoFooterHeadlineText({
        templateStyle,
        headlineText: isSeasonalPromoTemplate
          ? resolveTemplateCallToActionText({
              templateStyle,
              callToAction: socialDraft.call_to_action,
              priceDetail: socialDraft.price_detail,
            })
          : photoFooterSwappedText.headline,
        locationText: socialDraft.location_detail,
        startDate: socialDraft.start_date,
        endDate: socialDraft.end_date,
      });
      const headlineMeasured = measureWrappedSocialText({
        text: photoFooterHeadlineText,
        fontSize: photoFooterHeadlineFont,
        fontWeight: 800,
        fontFamily:
          socialFontFamily && socialFontFamily !== "inherit"
            ? socialFontFamily
            : "Poppins, sans-serif",
        maxWidth: 1000,
        minWidth: 1000,
        paddingX: 12,
        paddingY: 8,
        lineHeightMultiplier: 1,
        outlineWidth: 0,
      });
      const headlineFrame = {
        x: 0,
        y: 100,
        width: 1000,
        height: clampLayerValue(headlineMeasured.height, 120, 500),
      };
      const dateFrame = { x: 0, y: 700, width: 1000, height: 100 };
      const locationPriceFrame = { x: 0, y: 825, width: 1000, height: 75 };
      const bottomFrame = { x: 0, y: 925, width: 1000, height: 75 };
      const randomAlign: "left" | "center" = Math.random() < 0.5 ? "left" : "center";
      const randomBrandAlign: "left" | "center" | "right" =
        (["left", "center", "right"] as const)[
          Math.floor(Math.random() * 3)
        ] ?? "center";
      const randomBottomMode: "cta" | "contact" =
        Math.random() < 0.5 ? "cta" : "contact";
      const effectiveBottomMode: "cta" | "contact" = isSeasonalPromoTemplate
        ? "contact"
        : randomBottomMode;
      const brandFrame = {
        x: 40,
        y: 20,
        width: 920,
        height: hasBrandLogo ? 100 : 75,
      };
      const photoFooterDateText = resolvePhotoFooterDateLineText({
        startDate: socialDraft.start_date,
        endDate: socialDraft.end_date,
      });
      const photoFooterLocationPriceText = resolvePhotoFooterLocationPriceText({
        locationText: socialDraft.location_detail,
        priceText: isSeasonalPromoTemplate
          ? String(photoFooterSwappedText.headline ?? "").trim()
          : socialDraft.price_detail,
      });
      const photoFooterBottomText = resolvePhotoFooterBottomLineText({
        mode: effectiveBottomMode,
        callToAction: photoFooterSwappedText.cta,
        phoneText: socialBusinessPhoneText,
        emailText: socialBusinessEmailText,
      });
      const photoFooterBrandText = socialCompanyNameText;
      const photoFooterBrandFont = fitBandSingleLineFontSize({
        text: photoFooterBrandText,
        frame: brandFrame,
        maxFont: 220,
        minFont: 10,
        paddingX: 12,
        paddingY: 8,
        fontWeight: 800,
      });
      const photoFooterDateFont = fitBandSingleLineFontSize({
        text: photoFooterDateText,
        frame: dateFrame,
        maxFont: 220,
        minFont: 10,
        paddingX: 12,
        paddingY: 8,
        fontWeight: 800,
      });
      const photoFooterLocationPriceFont = fitBandSingleLineFontSize({
        text: photoFooterLocationPriceText,
        frame: locationPriceFrame,
        maxFont: 220,
        minFont: 10,
        paddingX: 12,
        paddingY: 8,
        fontWeight: 800,
      });
      const photoFooterBottomFont = fitBandSingleLineFontSize({
        text: photoFooterBottomText,
        frame: bottomFrame,
        maxFont: 220,
        minFont: 10,
        paddingX: 12,
        paddingY: 8,
        fontWeight: 800,
      });
      const photoFooterDateFinalFont = photoFooterDateFont;
      const photoFooterLocationPriceFinalFont = photoFooterLocationPriceFont;
      const photoFooterBottomFinalFont = photoFooterBottomFont;
      setSocialLayerOrder(
        hasImage
          ? [
              SOCIAL_BRAND_LAYER_ID,
              "cta",
              SOCIAL_CONTACT_LAYER_ID,
              "start",
              "headline",
              photoFooterImageLayerId,
              SOCIAL_HEADER_LAYER_ID,
            ]
          : [
              SOCIAL_BRAND_LAYER_ID,
              "cta",
              SOCIAL_CONTACT_LAYER_ID,
              "start",
              "headline",
              SOCIAL_HEADER_LAYER_ID,
            ],
      );
      setSocialLayerVisible(
        hasImage
          ? {
              [SOCIAL_BRAND_LAYER_ID]: true,
              cta: true,
              [SOCIAL_CONTACT_LAYER_ID]: true,
              start: true,
              headline: true,
              [photoFooterImageLayerId]: true,
              [SOCIAL_HEADER_LAYER_ID]: true,
            }
          : {
              [SOCIAL_BRAND_LAYER_ID]: true,
              cta: true,
              [SOCIAL_CONTACT_LAYER_ID]: true,
              start: true,
              headline: true,
              [SOCIAL_HEADER_LAYER_ID]: true,
            },
      );
      setSocialLayerLocked(
        hasImage
          ? {
              [SOCIAL_BRAND_LAYER_ID]: false,
              cta: false,
              [SOCIAL_CONTACT_LAYER_ID]: false,
              start: false,
              headline: false,
              [photoFooterImageLayerId]: false,
              [SOCIAL_HEADER_LAYER_ID]: false,
            }
          : {
              [SOCIAL_BRAND_LAYER_ID]: false,
              cta: false,
              [SOCIAL_CONTACT_LAYER_ID]: false,
              start: false,
              headline: false,
              [SOCIAL_HEADER_LAYER_ID]: false,
            },
      );
      setSocialLayerFrames(
        hasImage
          ? {
              [SOCIAL_BRAND_LAYER_ID]: brandFrame,
              cta: bottomFrame,
              [SOCIAL_CONTACT_LAYER_ID]: locationPriceFrame,
              start: dateFrame,
              headline: headlineFrame,
              [photoFooterImageLayerId]: imageFrame,
              [SOCIAL_HEADER_LAYER_ID]: { x: 0, y: 0, width: 1000, height: 1000 },
            }
          : {
              [SOCIAL_BRAND_LAYER_ID]: brandFrame,
              cta: bottomFrame,
              [SOCIAL_CONTACT_LAYER_ID]: locationPriceFrame,
              start: dateFrame,
              headline: headlineFrame,
              [SOCIAL_HEADER_LAYER_ID]: { x: 0, y: 0, width: 1000, height: 1000 },
            },
      );
      setSocialShapeStyles({
        [SOCIAL_HEADER_LAYER_ID]: {
          kind: "rectangle",
          color: randomBgColor,
          gradient: bgGradient,
          opacity: 100,
        },
      });
      const nextImageLayers: Record<string, { id: string; url: string; type: string }> = {};
      if (hasImage) {
        nextImageLayers[photoFooterImageLayerId] = {
          id: photoFooterImageLayerId,
          url: String(chosenMedia?.url ?? ""),
          type: detectSocialMediaTypeFromUrl(String(chosenMedia?.url ?? "")),
        };
      }
      if (hasBrandLogo) {
        nextImageLayers[SOCIAL_BRAND_LAYER_ID] = {
          id: SOCIAL_BRAND_LAYER_ID,
          url: socialBrandLogoUrl,
          type: detectSocialMediaTypeFromUrl(socialBrandLogoUrl),
        };
      }
      setSocialImageLayers(nextImageLayers);
      setSocialTextFontSizes((prev) => ({
        ...prev,
        [SOCIAL_BRAND_LAYER_ID]: photoFooterBrandFont,
        headline: photoFooterHeadlineFont,
        start: photoFooterDateFinalFont,
        [SOCIAL_CONTACT_LAYER_ID]: photoFooterLocationPriceFinalFont,
        cta: photoFooterBottomFinalFont,
      }));
      setSocialPhotoFooterAlign(randomAlign);
      setSocialPhotoFooterBrandAlign(randomBrandAlign);
      setSocialPhotoFooterBottomMode(effectiveBottomMode);
      setSocialToolTarget("headline");
      setSocialToolFontSize(photoFooterHeadlineFont);
      setSocialSelectedLayer("headline");
      setSocialPreviewOverrideUrl("");
      setSocialSelectedImageId(chosenMedia?.id ?? "");
      setSocialPreviewDropActive(false);
      setSocialDraggingLayer("");
      setSocialDraft((prev) => ({
        ...prev,
        template_style: templateStyle,
        layout_preset: layoutPreset,
        aspect_ratio: aspectRatio,
        selected_template_id: `${aspectRatio}|${layoutPreset}`,
      }));
      setStatus(
        hasImage
          ? `Photo + footer generated with random color + image: ${chosenMedia?.label ?? "media"}.`
          : "Photo + footer generated with a random solid color background (no media available).",
      );
      return;
    }

    const alignChoices = ["left", "center", "right"] as const;
    const randomAlign =
      alignChoices[Math.floor(Math.random() * alignChoices.length)] ?? "center";
    const colorChoices = [
      "#0ea5e9",
      "#22c55e",
      "#f97316",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
      "#14b8a6",
      "#f59e0b",
      "#e11d48",
      "#6366f1",
    ];
    const randomRectColor =
      colorChoices[Math.floor(Math.random() * colorChoices.length)] ?? "#0ea5e9";
    const randomBrandSide = Math.random() < 0.5 ? "left" : "right";
    const randomDateSide = Math.random() < 0.5 ? "left" : "right";
    const randomDateAlign = Math.random() < 0.5 ? "left" : "center";
    const randomDateFormat: "start" | "range" = Math.random() < 0.5 ? "start" : "range";
    const aspectDefaults = announcementDefaultsByAspect(aspectRatio);
    const dateX =
      randomDateSide === "right"
        ? 1000 - aspectDefaults.dateWidth - aspectDefaults.dateMarginX
        : aspectDefaults.dateMarginX;
    const dateWidth = aspectDefaults.dateWidth;
    const dateHeight = aspectDefaults.dateHeight;
    const dateColorChoices = [
      "#0ea5e9",
      "#22c55e",
      "#f97316",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
      "#14b8a6",
      "#f59e0b",
      "#e11d48",
      "#6366f1",
    ];
    const randomDateColor =
      dateColorChoices[Math.floor(Math.random() * dateColorChoices.length)] ?? "#06b6d4";
    const noOfferDetailsProvided = [
      socialDraft.headline,
      socialDraft.start_date,
      socialDraft.end_date,
      socialDraft.age_range,
      socialDraft.price_detail,
      socialDraft.location_detail,
      socialDraft.call_to_action,
      socialDraft.extra_notes,
    ].every((value) => String(value ?? "").trim().length === 0);
    const noContentSourceSelected =
      !String(socialSourceType ?? "").trim() &&
      !String(socialDraft.product_id ?? "").trim() &&
      !String(socialDraft.service_code ?? "").trim() &&
      !String(socialDraft.subject_id ?? "").trim() &&
      !String(socialDraft.topic_id ?? "").trim() &&
      !String(socialDraft.selected_template_id ?? "").trim() &&
      (socialDraft.selected_media_ids?.length ?? 0) === 0;
    const usePresetDefaultsOnly = noOfferDetailsProvided && noContentSourceSelected;

    const randomFooterInfoSource =
      templateStyle === "Seasonal promo"
        ? "cta"
        : usePresetDefaultsOnly
        ? "cta"
        : (["age", "location", "cta"] as const)[
            Math.floor(Math.random() * 3)
          ] ?? "age";
    const randomFooterInfoIcon =
      (["map-pin", "pin-location", "maps"] as const)[
        Math.floor(Math.random() * 3)
      ] ?? "map-pin";
    const footerTextColors = [
      "#ffffff",
      "#fde047",
      "#fca5a5",
      "#93c5fd",
      "#86efac",
      "#f9a8d4",
      "#fdba74",
      "#c4b5fd",
    ];
    const footerShadowColors = [
      "#000000",
      "#1f2937",
      "#312e81",
      "#7f1d1d",
      "#14532d",
      "#111827",
      "#831843",
      "#422006",
    ];
    const randomFooterTextColor =
      footerTextColors[Math.floor(Math.random() * footerTextColors.length)] ?? "#ffffff";
    const randomFooterShadowColor =
      footerShadowColors[Math.floor(Math.random() * footerShadowColors.length)] ?? "#000000";
    const randomFooterFallbackMode =
      usePresetDefaultsOnly
        ? "tutoring"
        : (["blank", "name", "hash-name", "tutoring"] as const)[
            Math.floor(Math.random() * 4)
          ] ?? "blank";
    const randomFooterFallbackName =
      socialAnnouncementFallbackNames.length > 0
        ? socialAnnouncementFallbackNames[
            Math.floor(Math.random() * socialAnnouncementFallbackNames.length)
          ] ?? ""
        : "";
    const generatedFooterInfo = computeAnnouncementFooterInfo({
      source: randomFooterInfoSource,
      ageRange: socialDraft.age_range,
      locationDetail: socialDraft.location_detail,
      callToAction: resolveTemplateCallToActionText({
        templateStyle,
        callToAction: socialDraft.call_to_action,
        priceDetail: socialDraft.price_detail,
      }),
      fallbackMode: randomFooterFallbackMode,
      fallbackName: randomFooterFallbackName,
    });

    const generatedHeadlineText = resolveBoldHeadlinePrimaryText({
      templateStyle,
      layoutPreset,
      headlineText: socialDraft.headline,
      callToAction: socialDraft.call_to_action,
      priceDetail: socialDraft.price_detail,
      startDate: socialDraft.start_date,
      productName: socialSelectedProduct?.product_name,
    });
    const generatedFooterInfoText = resolveBoldHeadlineFooterText({
      templateStyle,
      layoutPreset,
      headlineText: socialDraft.headline,
      callToAction: socialDraft.call_to_action,
      priceDetail: socialDraft.price_detail,
      startDate: socialDraft.start_date,
      productName: socialSelectedProduct?.product_name,
      announcementFooterText: generatedFooterInfo.text,
    });
    const measuredHeadline = measureWrappedSocialText({
      text: generatedHeadlineText,
      fontSize: aspectDefaults.headlineFont,
      fontWeight: 800,
      fontFamily:
        socialFontFamily && socialFontFamily !== "inherit"
          ? socialFontFamily
          : "Poppins, sans-serif",
      maxWidth: 1000,
      minWidth: 1000,
      paddingX: 24,
      paddingY: 0,
      lineHeightMultiplier: 0.9,
      outlineWidth: 2,
      tightHeight: true,
    });
    const headlineHeight = clampLayerValue(
      measuredHeadline.height,
      70,
      520,
    );
    const dateY = clampLayerValue(headlineHeight + aspectDefaults.dateOffsetY, 0, 780);
    const announcementFooterFrame = resolveAnnouncementFooterFrame();
    const announcementBrandLogoFrame = resolveAnnouncementBrandLogoFrame();
    const footerInfoFrame = resolveAnnouncementFooterInfoFrame({
      text: generatedFooterInfoText,
      fontSize:
        aspectDefaults.footerInfoFont ||
        resolveAnnouncementFooterInfoFontPt(generatedFooterInfoText),
      footerFrame: announcementFooterFrame,
    });

    const announcementLayerOrder = chosenMedia
      ? [...SOCIAL_ANNOUNCEMENT_LAYER_ORDER]
      : SOCIAL_ANNOUNCEMENT_LAYER_ORDER.filter((layerId) => layerId !== "media");
    setSocialLayerOrder(announcementLayerOrder);
    setSocialLayerVisible({
      media: Boolean(chosenMedia),
      [SOCIAL_BG_LAYER_ID]: true,
      [SOCIAL_HEADER_LAYER_ID]: true,
      headline: true,
      cta: true,
      [SOCIAL_FOOTER_LAYER_ID]: true,
      [SOCIAL_BRAND_LAYER_ID]: true,
      [SOCIAL_CONTACT_LAYER_ID]: true,
      [SOCIAL_DATE_BOX_LAYER_ID]: true,
      start: true,
    });
    setSocialLayerLocked({
      media: false,
      [SOCIAL_BG_LAYER_ID]: false,
      [SOCIAL_HEADER_LAYER_ID]: false,
      headline: false,
      cta: false,
      [SOCIAL_FOOTER_LAYER_ID]: false,
      [SOCIAL_BRAND_LAYER_ID]: false,
      [SOCIAL_CONTACT_LAYER_ID]: false,
      [SOCIAL_DATE_BOX_LAYER_ID]: false,
      start: false,
    });
    setSocialLayerFrames({
      [SOCIAL_BG_LAYER_ID]: { x: 0, y: 0, width: 1000, height: 1000 },
      [SOCIAL_HEADER_LAYER_ID]: { x: 0, y: 0, width: 1000, height: headlineHeight },
      headline: { x: 0, y: 0, width: 1000, height: headlineHeight },
      cta: footerInfoFrame,
      [SOCIAL_FOOTER_LAYER_ID]: announcementFooterFrame,
      [SOCIAL_BRAND_LAYER_ID]: socialHasBrandLogo
        ? announcementBrandLogoFrame
        : {
            x: 0,
            y: announcementFooterFrame.y,
            width: 1000,
            height: announcementFooterFrame.height,
          },
      [SOCIAL_CONTACT_LAYER_ID]: announcementFooterFrame,
      [SOCIAL_DATE_BOX_LAYER_ID]: {
        x: dateX,
        y: dateY,
        width: dateWidth,
        height: dateHeight,
      },
      start: {
        x: dateX,
        y: dateY,
        width: dateWidth,
        height: dateHeight,
      },
    });
    setSocialImageLayers(
      socialHasBrandLogo
        ? {
            [SOCIAL_BRAND_LAYER_ID]: {
              id: SOCIAL_BRAND_LAYER_ID,
              url: socialBrandLogoUrl,
              type: detectSocialMediaTypeFromUrl(socialBrandLogoUrl),
            },
          }
        : {},
    );
    setSocialShapeStyles({
      [SOCIAL_BG_LAYER_ID]: {
        kind: "rectangle",
        color: randomRectColor,
        opacity: 100,
      },
      [SOCIAL_HEADER_LAYER_ID]: {
        kind: "rectangle",
        color: randomRectColor,
        opacity: 50,
      },
      [SOCIAL_FOOTER_LAYER_ID]: {
        kind: "rectangle",
        color: "#000000",
        opacity: 70,
      },
      [SOCIAL_DATE_BOX_LAYER_ID]: {
        kind: "rect",
        color: randomDateColor,
        opacity: 70,
        flipX: Boolean(aspectDefaults.flipDateBoxX),
      },
    });
    setSocialToolTarget("headline");
    setSocialToolAlignX(randomAlign);
    setSocialToolAlignY("center");
    setSocialToolColor("#ffffff");
    setSocialToolFontSize(aspectDefaults.headlineFont);
    setSocialTextFontSizes((prev) => ({
      ...prev,
      headline: aspectDefaults.headlineFont,
      start: aspectDefaults.dateFont ?? SOCIAL_ANNOUNCEMENT_DATE_FONT_PT,
      cta:
        aspectDefaults.footerInfoFont ||
        resolveAnnouncementFooterInfoFontPt(generatedFooterInfoText),
    }));
    setSocialToolShadowColor("#000000");
    setSocialToolShadowOpacity(70);
    setSocialToolShadowSize(6);
    setSocialToolShadowAngle(135);
    setSocialToolShadowDistance(6);
    setSocialToolOutlineColor("#000000");
    setSocialToolOutlineWidth(2);
    setSocialFooterBrandSide(randomBrandSide);
    setSocialDateComponentSide(randomDateSide);
    setSocialDateTextFormat(randomDateFormat);
    setSocialDateTextAlign(randomDateAlign);
    setSocialFooterInfoSource(randomFooterInfoSource);
    setSocialFooterInfoLocationIcon(randomFooterInfoIcon);
    setSocialFooterInfoTextColor(randomFooterTextColor);
    setSocialFooterInfoShadowColor(randomFooterShadowColor);
    setSocialFooterInfoEmptyMode(randomFooterFallbackMode);
    setSocialFooterInfoEmptyName(randomFooterFallbackName);
    setSocialPreviewOverrideUrl(chosenMedia?.url ?? "");
    setSocialSelectedImageId(chosenMedia?.id ?? "");
    setSocialSelectedLayer("headline");
    setSocialDraft((prev) => ({
      ...prev,
      template_style: templateStyle,
      layout_preset: layoutPreset,
      aspect_ratio: aspectRatio,
      selected_template_id: `${aspectRatio}|${layoutPreset}`,
    }));
    setStatus(
      chosenMedia
        ? `Post generated. Using image: ${chosenMedia.label}.`
        : "Post generated with default background and preset placeholders.",
    );
  };

  const clearSocialCanvasState = () => {
    setSocialLayerOrder([]);
    setSocialLayerVisible({});
    setSocialLayerLocked({});
    setSocialLayerFrames({});
    setSocialShapeStyles({});
    setSocialImageLayers({});
    setSocialSelectedLayer("");
    setSocialSelectedImageId("");
    setSocialPreviewOverrideUrl("");
    setSocialPreviewDropActive(false);
    setSocialDraggingLayer("");
    setSocialInlineTextOverrides({});
    setSocialTextColors({});
    setSocialInlineEditorLayer("");
    setSocialInlineEditorValue("");
    setSocialInlineEditorOriginalValue("");
    setSocialHistory([]);
    setSocialHistoryIndex(-1);
    setSocialSuccessBrandSide("left");
    setSocialSuccessContactText("");
    setSocialSuccessSideTextColors({
      left: "#ffffff",
      right: "#ffffff",
    });
    socialSuccessColorRequestRef.current += 1;
  };

  const applySocialLayoutPreset = (
    nextLayoutPreset,
    nextAspectRatio = socialDraft.aspect_ratio,
  ) => {
    setSocialDraft((prev) => ({
      ...prev,
      layout_preset: nextLayoutPreset,
      ...(nextAspectRatio ? { aspect_ratio: nextAspectRatio } : null),
    }));
    clearSocialCanvasState();
    setStatus(
      `${nextLayoutPreset || "Layout preset"} selected. Canvas cleared.`,
    );
  };

  const applySocialTemplateStyle = (nextTemplateStyle) => {
    setSocialDraft((prev) => ({
      ...prev,
      template_style: nextTemplateStyle,
    }));
    clearSocialCanvasState();
    setStatus(
      `${nextTemplateStyle || "Template style"} selected. Canvas cleared.`,
    );
  };

  const applySocialShapeColor = (color) => {
    setSocialShapeColor(color);
    if (isSocialShapeLayer(socialSelectedLayer)) {
      setSocialShapeStyles((prev) => ({
        ...prev,
        [socialSelectedLayer]: {
          ...getSocialShapeStyleMeta(socialSelectedLayer),
          color,
        },
      }));
    }
  };
  const isSocialTextLayer = (layerId) =>
    layerId === "headline" ||
    layerId === "start" ||
    layerId === "cta" ||
    layerId === SOCIAL_CONTACT_LAYER_ID ||
    layerId === SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID ||
    layerId === SOCIAL_SUCCESS_CONTACT_LAYER_ID ||
    isSocialCustomTextLayer(layerId) ||
    SOCIAL_BAND_TEXT_LAYER_IDS.includes(String(layerId || "")) ||
    layerId === SOCIAL_BAND_CONTACT_A_LAYER_ID ||
    layerId === SOCIAL_BAND_CONTACT_B_LAYER_ID ||
    ((layerId === SOCIAL_BRAND_LAYER_ID ||
      layerId === SOCIAL_BAND_BRAND_LAYER_ID ||
      layerId === SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID) &&
      !socialHasBrandLogo);

  const socialTextMaxWidthByLayout = (layoutPreset) => {
    if (layoutPreset === "Bold headline") {
      return { headline: 890, cta: 890 };
    }
    if (layoutPreset === "Band rows") {
      return { headline: 920, start: 920, cta: 920 };
    }
    if (layoutPreset === "Photo + footer") {
      return {};
    }
    if (layoutPreset === "Schedule list") {
      return { start: 500 };
    }
    return { headline: 900, start: 500, cta: 900 };
  };

  const socialRenderedLayerText = (layerId) => {
    const swappedText = resolveEnrollmentSwappedOfferText({
      templateStyle: socialDraft.template_style,
      headlineText: socialDraft.headline,
      callToAction: socialDraft.call_to_action,
      priceDetail: socialDraft.price_detail,
      startDate: socialDraft.start_date,
      productName: socialSelectedProduct?.product_name,
    });
    if (layerId === "headline") {
      if (
        isBoldHeadlineAnnouncementTemplate({
          templateStyle: socialDraft.template_style,
          layoutPreset: socialDraft.layout_preset,
        })
      ) {
        return resolveBoldHeadlinePrimaryText({
          templateStyle: socialDraft.template_style,
          layoutPreset: socialDraft.layout_preset,
          headlineText: socialDraft.headline,
          callToAction: socialDraft.call_to_action,
          priceDetail: socialDraft.price_detail,
          startDate: socialDraft.start_date,
          productName: socialSelectedProduct?.product_name,
        });
      }
      if (socialDraft.template_style === "Enrollment reminder") {
        return swappedText.headline || "Call to action";
      }
      return socialDraft.headline || socialSelectedProduct?.product_name || "Your headline";
    }
    if (layerId === "start") {
      if (socialDraft.layout_preset === "Schedule list") {
        return socialDraft.start_date
          ? `Dates: ${socialDraft.start_date}${
              socialDraft.end_date ? ` - ${socialDraft.end_date}` : ""
            }`
          : "Dates / schedule";
      }
      return socialDraft.start_date || "Start date";
    }
    if (layerId === "cta") {
      if (
        isBoldHeadlineAnnouncementTemplate({
          templateStyle: socialDraft.template_style,
          layoutPreset: socialDraft.layout_preset,
        })
      ) {
        return resolveBoldHeadlineFooterText({
          templateStyle: socialDraft.template_style,
          layoutPreset: socialDraft.layout_preset,
          headlineText: socialDraft.headline,
          callToAction: socialDraft.call_to_action,
          priceDetail: socialDraft.price_detail,
          startDate: socialDraft.start_date,
          productName: socialSelectedProduct?.product_name,
          announcementFooterText: socialAnnouncementFooterInfo.text,
        });
      }
      if (socialDraft.template_style === "Enrollment reminder") {
        return swappedText.cta || "Add Headline";
      }
      if (socialDraft.layout_preset === "Bold headline") {
        return (
          resolveTemplateCallToActionText({
            templateStyle: socialDraft.template_style,
            callToAction: socialDraft.call_to_action,
            priceDetail: socialDraft.price_detail,
          }) ||
          socialDraft.start_date ||
          "Call to action"
        );
      }
      if (socialDraft.layout_preset === "Photo + footer") {
        return (
          resolveTemplateCallToActionText({
            templateStyle: socialDraft.template_style,
            callToAction: socialDraft.call_to_action,
            priceDetail: socialDraft.price_detail,
          }) ||
          socialDraft.location_detail ||
          "Join us"
        );
      }
      return (
        resolveTemplateCallToActionText({
          templateStyle: socialDraft.template_style,
          callToAction: socialDraft.call_to_action,
          priceDetail: socialDraft.price_detail,
        }) || "Call to action"
      );
    }
    return "";
  };
  const socialLayerToDraftField = (layerId) => {
    if (layerId === "headline") return "headline";
    if (layerId === SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID) return "extra_notes";
    return null;
  };

  const socialBeginInlineTextEdit = (layerId, currentText = "") => {
    const field = socialLayerToDraftField(layerId);
    const currentValue = field
      ? String(socialDraft[field] ?? currentText ?? "")
      : String(socialInlineTextOverrides[layerId] ?? currentText ?? "");
    setSocialInlineEditorLayer(layerId);
    setSocialInlineEditorValue(currentValue);
    setSocialInlineEditorOriginalValue(currentValue);
  };

  const applySocialInlineTextEdit = () => {
    const field = socialLayerToDraftField(socialInlineEditorLayer);
    const editingLayer = socialInlineEditorLayer;
    const nextValue = socialInlineEditorValue;
    if (field) {
      setSocialDraft((prev) => ({
        ...prev,
        [field]: nextValue,
      }));
    } else if (editingLayer) {
      setSocialInlineTextOverrides((prev) => ({
        ...prev,
        [editingLayer]: nextValue,
      }));
    }
    setSocialInlineEditorLayer("");
    setSocialInlineEditorValue("");
    setSocialInlineEditorOriginalValue("");
  };

  const cancelSocialInlineTextEdit = () => {
    setSocialInlineEditorLayer("");
    setSocialInlineEditorValue("");
    setSocialInlineEditorOriginalValue("");
  };

  const measureWrappedSocialText = ({
    text,
    fontSize,
    fontWeight,
    fontFamily,
    maxWidth,
    minWidth = 120,
    paddingX = 12,
    paddingY = 10,
    lineHeightMultiplier = 1.1,
    outlineWidth = 0,
    tightHeight = false,
  }) => {
    // Always measure against native design dimensions (not zoomed preview pixels)
    // so export layout remains sharp and consistent across zoom modes.
    const pxPerUnitX = socialDesignWidth / 1000;
    const pxPerUnitY = socialDesignHeight / 1000;
    const toPxX = (value) => Math.max(0, Number(value) || 0) * pxPerUnitX;
    const toPxY = (value) => Math.max(0, Number(value) || 0) * pxPerUnitY;
    const toUnitsX = (value) =>
      pxPerUnitX > 0 ? Math.max(0, Number(value) || 0) / pxPerUnitX : 0;
    const toUnitsY = (value) =>
      pxPerUnitY > 0 ? Math.max(0, Number(value) || 0) / pxPerUnitY : 0;

    if (typeof document === "undefined") {
      return {
        width: Math.max(minWidth, Math.min(maxWidth, minWidth)),
        height: Math.max(36, Math.round(fontSize * lineHeightMultiplier + paddingY * 2)),
      };
    }

    const canvas = document.createElement("canvas");
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) {
      return {
        width: Math.max(minWidth, Math.min(maxWidth, minWidth)),
        height: Math.max(36, Math.round(fontSize * lineHeightMultiplier + paddingY * 2)),
      };
    }

    const safeText = String(text || "");
    const safeFontFamilyRaw = String(fontFamily || "inherit").trim();
    const safeFontFamily =
      safeFontFamilyRaw && safeFontFamilyRaw !== "inherit"
        ? safeFontFamilyRaw
        : "Poppins, sans-serif";
    const safeFontWeight = Number(fontWeight) || 700;
    ctx2d.font = `${safeFontWeight} ${fontSize}px ${safeFontFamily}`;

    const outlinePad = Math.max(0, Number(outlineWidth) || 0);
    const strokePadX = outlinePad * 2 + 2;
    const strokePadY = tightHeight ? outlinePad * 2 : strokePadX;
    const maxWidthPx = Math.max(20, toPxX(maxWidth));
    const minWidthPx = Math.max(1, toPxX(minWidth));
    const paddingXPx = toPxX(paddingX);
    const paddingYPx = toPxY(paddingY);
    const innerMaxWidth = Math.max(20, maxWidthPx - paddingXPx * 2 - strokePadX);
    const lines = [];

    const breakLongWord = (word) => {
      const chunks = [];
      let chunk = "";
      for (const ch of word) {
        const candidate = `${chunk}${ch}`;
        if (ctx2d.measureText(candidate).width <= innerMaxWidth || chunk.length === 0) {
          chunk = candidate;
          continue;
        }
        chunks.push(chunk);
        chunk = ch;
      }
      if (chunk) chunks.push(chunk);
      return chunks;
    };

    for (const rawParagraph of safeText.split("\n")) {
      const paragraph = rawParagraph.trim();
      if (!paragraph) {
        lines.push("");
        continue;
      }

      const words = paragraph.split(/\s+/);
      let line = "";
      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        const candidateWidth = ctx2d.measureText(candidate).width;
        if (candidateWidth <= innerMaxWidth) {
          line = candidate;
          continue;
        }

        if (line) {
          lines.push(line);
        }

        if (ctx2d.measureText(word).width <= innerMaxWidth) {
          line = word;
          continue;
        }

        const pieces = breakLongWord(word);
        if (pieces.length > 1) {
          lines.push(...pieces.slice(0, -1));
          line = pieces[pieces.length - 1] ?? "";
        } else {
          line = word;
        }
      }
      lines.push(line);
    }

    const normalizedLines = lines.length ? lines : [""];
    const lineWidths = normalizedLines.map((line) => ctx2d.measureText(line).width);
    const contentWidth = Math.max(1, ...lineWidths);
    const lineHeight = Math.max(1, fontSize * lineHeightMultiplier);
    const contentHeight = normalizedLines.length * lineHeight;

    const widthSafetyPad = Math.max(2, strokePadX + 2);
    const measuredWidthPx = Math.ceil(
      clampLayerValue(
        contentWidth + paddingXPx * 2 + strokePadX + widthSafetyPad,
        minWidthPx,
        maxWidthPx,
      ),
    );
    const heightSafetyPad = tightHeight ? 0 : Math.max(2, strokePadY + 2);
    const measuredHeightPx = Math.ceil(
      Math.max(36, contentHeight + paddingYPx * 2 + strokePadY + heightSafetyPad),
    );

    return {
      width: clampLayerValue(Math.ceil(toUnitsX(measuredWidthPx)), minWidth, maxWidth),
      height: Math.max(16, Math.ceil(toUnitsY(measuredHeightPx))),
    };
  };

  const socialSelectLayer = (layerId) => {
    setSocialSelectedLayer(layerId);
    if (!isSocialTextLayer(layerId)) return;
    const announcementCtaDefault =
      isBoldHeadlineAnnouncementTemplate({
        templateStyle: socialDraft.template_style,
        layoutPreset: socialDraft.layout_preset,
      })
        ? resolveAnnouncementFooterInfoFontPt(
            resolveBoldHeadlineFooterText({
              templateStyle: socialDraft.template_style,
              layoutPreset: socialDraft.layout_preset,
              headlineText: socialDraft.headline,
              callToAction: socialDraft.call_to_action,
              priceDetail: socialDraft.price_detail,
              startDate: socialDraft.start_date,
              productName: socialSelectedProduct?.product_name,
              announcementFooterText: socialAnnouncementFooterInfo.text,
            }),
          )
        : 75;
    const fallbackByLayer = {
      headline: socialDraft.layout_preset === "Photo + footer" ? 150 : 48,
      start: 30,
      cta: announcementCtaDefault,
      [SOCIAL_CONTACT_LAYER_ID]: 30,
      [SOCIAL_BRAND_LAYER_ID]: 30,
      [SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID]: 48,
      [SOCIAL_SUCCESS_CONTACT_LAYER_ID]: 30,
      [SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID]: 30,
    };
    const fallbackSize = fallbackByLayer[layerId] ?? socialToolFontSize ?? 48;
    const nextSize = socialTextFontSizes[layerId] ?? fallbackSize;
    if (socialTextFontSizes[layerId] == null && Number.isFinite(Number(nextSize))) {
      setSocialTextFontSizes((prev) => ({ ...prev, [layerId]: Number(nextSize) }));
    }
    setSocialToolTarget(layerId);
    setSocialToolFontSize(Number(nextSize) || fallbackSize);
    const nextColor = String(socialTextColors[layerId] ?? "").trim();
    if (nextColor) {
      setSocialToolColor(nextColor);
    }
  };

  const socialDeleteLayer = (layerId) => {
    if (socialLayerLocked[layerId]) return;
    if (layerId === "media") {
      setSocialPreviewOverrideUrl("");
      setSocialSelectedImageId("");
    }

    setSocialLayerOrder((prev) => {
      const next = prev.filter((id) => id !== layerId);
      if (socialSelectedLayer === layerId) {
        setSocialSelectedLayer(next[0] ?? "headline");
      }
      return next;
    });
    setSocialLayerVisible((prev) => {
      const next = { ...prev };
      delete next[layerId];
      return next;
    });
    setSocialLayerLocked((prev) => {
      const next = { ...prev };
      delete next[layerId];
      return next;
    });
    setSocialLayerFrames((prev) => {
      const next = { ...prev };
      delete next[layerId];
      return next;
    });
    setSocialTextFontSizes((prev) => {
      if (!Object.prototype.hasOwnProperty.call(prev, layerId)) return prev;
      const next = { ...prev };
      delete next[layerId];
      return next;
    });
    setSocialTextColors((prev) => {
      if (!Object.prototype.hasOwnProperty.call(prev, layerId)) return prev;
      const next = { ...prev };
      delete next[layerId];
      return next;
    });
    setSocialInlineTextOverrides((prev) => {
      if (!Object.prototype.hasOwnProperty.call(prev, layerId)) return prev;
      const next = { ...prev };
      delete next[layerId];
      return next;
    });
    if (isSocialShapeLayer(layerId)) {
      setSocialShapeStyles((prev) => {
        const next = { ...prev };
        delete next[layerId];
        return next;
      });
    }
    if (isSocialImageLayer(layerId)) {
      setSocialImageLayers((prev) => {
        const next = { ...prev };
        delete next[layerId];
        return next;
      });
    }
  };

  const beginSocialLayerDrag = (layerId, event) => {
    if (socialLayerLocked[layerId]) return;
    if (socialActiveTool !== "pointer") return;
    if (event.button !== 0) return;
    const previewEl = socialPreviewRef.current;
    if (!previewEl) return;
    const frame = socialLayerFrames[layerId];
    if (!frame) return;
    const rect = previewEl.getBoundingClientRect();
    socialDragStateRef.current = {
      pointerId: event.pointerId,
      layerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      initialFrame: frame,
      rect,
    };
    if (event.currentTarget?.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setSocialDraggingLayer(layerId);
    socialSelectLayer(layerId);
    event.preventDefault();
    event.stopPropagation();
  };

  const beginSocialLayerResize = (layerId, handle, event) => {
    if (socialLayerLocked[layerId]) return;
    if (event.button !== 0) return;
    const previewEl = socialPreviewRef.current;
    if (!previewEl) return;
    const frame = socialLayerFrames[layerId];
    if (!frame) return;
    const rect = previewEl.getBoundingClientRect();
    socialResizeStateRef.current = {
      pointerId: event.pointerId,
      layerId,
      handle,
      startClientX: event.clientX,
      startClientY: event.clientY,
      initialFrame: frame,
      initialFontSize: isSocialTextLayer(layerId)
        ? socialTextFontSizes[layerId] ?? socialToolFontSize ?? 24
        : null,
      rect,
    };
    if (event.currentTarget?.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setSocialDraggingLayer(layerId);
    socialSelectLayer(layerId);
    event.preventDefault();
    event.stopPropagation();
  };

  const onSocialPreviewPointerDown = (event) => {
    if (event.button !== 0) return;
    if (socialActiveTool !== "shape") return;
    const previewEl = socialPreviewRef.current;
    if (!previewEl) return;
    const rect = previewEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const startX = clampLayerValue(
      Math.round(((event.clientX - rect.left) / rect.width) * 1000),
      0,
      1000,
    );
    const startY = clampLayerValue(
      Math.round(((event.clientY - rect.top) / rect.height) * 1000),
      0,
      1000,
    );
    const initialShape = {
      x: clampLayerValue(startX, 0, 984),
      y: clampLayerValue(startY, 0, 984),
      width: 16,
      height: 16,
    };
    const newLayerId = buildSocialShapeLayerId();
    setSocialLayerOrder((prev) => {
      const baseIndex = prev.findIndex((layerId) => isSocialShapeLayer(layerId));
      const insertAt = baseIndex >= 0 ? baseIndex + 1 : prev.length;
      const next = [...prev];
      next.splice(insertAt, 0, newLayerId);
      return next;
    });
    setSocialLayerVisible((prev) => ({ ...prev, [newLayerId]: true }));
    setSocialLayerLocked((prev) => ({ ...prev, [newLayerId]: false }));
    setSocialLayerFrames((prev) => ({ ...prev, [newLayerId]: initialShape }));
    setSocialShapeStyles((prev) => ({
      ...prev,
      [newLayerId]: {
        kind: socialShapeKind,
        color: socialShapeColor,
        opacity: socialShapeOpacity,
      },
    }));
    socialShapeDrawStateRef.current = {
      pointerId: event.pointerId,
      rect,
      startX,
      startY,
      layerId: newLayerId,
    };
    setSocialDraggingLayer(newLayerId);
    socialSelectLayer(newLayerId);
    if (event.currentTarget?.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
  };

  const addSocialTextLayerAtPoint = (event) => {
    const previewEl = socialPreviewRef.current;
    if (!previewEl) return;
    const rect = previewEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const clickX = clampLayerValue(
      Math.round(((event.clientX - rect.left) / rect.width) * 1000),
      0,
      1000,
    );
    const clickY = clampLayerValue(
      Math.round(((event.clientY - rect.top) / rect.height) * 1000),
      0,
      1000,
    );
    const defaultWidth = 520;
    const defaultHeight = 140;
    const frame = {
      x: clampLayerValue(clickX, 0, Math.max(0, 1000 - defaultWidth)),
      y: clampLayerValue(clickY, 0, Math.max(0, 1000 - defaultHeight)),
      width: defaultWidth,
      height: defaultHeight,
    };
    const newLayerId = buildSocialTextLayerId();
    const initialText = "Edit text";
    const defaultFontSize = 48;

    // New text layers should start from a clean text style baseline.
    setSocialToolFontSize(defaultFontSize);
    setSocialToolOutlineWidth(0);
    setSocialToolShadowOpacity(0);
    setSocialToolShadowSize(0);
    setSocialToolShadowDistance(0);

    setSocialLayerOrder((prev) => [newLayerId, ...prev]);
    setSocialLayerVisible((prev) => ({ ...prev, [newLayerId]: true }));
    setSocialLayerLocked((prev) => ({ ...prev, [newLayerId]: false }));
    setSocialLayerFrames((prev) => ({ ...prev, [newLayerId]: frame }));
    setSocialTextFontSizes((prev) => ({
      ...prev,
      [newLayerId]: defaultFontSize,
    }));
    setSocialTextColors((prev) => ({ ...prev, [newLayerId]: socialToolColor || "#ffffff" }));
    setSocialInlineTextOverrides((prev) => ({ ...prev, [newLayerId]: initialText }));
    socialSelectLayer(newLayerId);
    setSocialActiveTool("text");
    setSocialInlineEditorLayer(newLayerId);
    setSocialInlineEditorValue(initialText);
    setSocialInlineEditorOriginalValue(initialText);
  };

  const onSocialPreviewPointerMove = (event) => {
    const resize = socialResizeStateRef.current;
    if (resize && resize.pointerId === event.pointerId) {
      const { layerId, handle, startClientX, startClientY, initialFrame, rect } =
        resize;
      if (!rect.width || !rect.height) return;
      const deltaX = ((event.clientX - startClientX) / rect.width) * 1000;
      const deltaY = ((event.clientY - startClientY) / rect.height) * 1000;
      const minSize = 16;

      let x = initialFrame.x;
      let y = initialFrame.y;
      let width = initialFrame.width;
      let height = initialFrame.height;

      if (handle.includes("e")) {
        width = clampLayerValue(Math.round(initialFrame.width + deltaX), minSize, 1000 - x);
      }
      if (handle.includes("s")) {
        height = clampLayerValue(
          Math.round(initialFrame.height + deltaY),
          minSize,
          1000 - y,
        );
      }
      if (handle.includes("w")) {
        const maxX = initialFrame.x + initialFrame.width - minSize;
        x = clampLayerValue(Math.round(initialFrame.x + deltaX), 0, maxX);
        width = clampLayerValue(
          Math.round(initialFrame.x + initialFrame.width - x),
          minSize,
          1000 - x,
        );
      }
      if (handle.includes("n")) {
        const maxY = initialFrame.y + initialFrame.height - minSize;
        y = clampLayerValue(Math.round(initialFrame.y + deltaY), 0, maxY);
        height = clampLayerValue(
          Math.round(initialFrame.y + initialFrame.height - y),
          minSize,
          1000 - y,
        );
      }

      setSocialLayerFrames((prev) => {
        const current = prev[layerId] ?? initialFrame;
        if (
          current.x === x &&
          current.y === y &&
          current.width === width &&
          current.height === height
        ) {
          return prev;
        }
        return {
          ...prev,
          [layerId]: { ...current, x, y, width, height },
        };
      });
      event.preventDefault();
      return;
    }

    const draw = socialShapeDrawStateRef.current;
    if (draw && draw.pointerId === event.pointerId) {
      const { rect, startX, startY, layerId } = draw;
      if (!rect.width || !rect.height) return;
      const currentX = clampLayerValue(
        Math.round(((event.clientX - rect.left) / rect.width) * 1000),
        0,
        1000,
      );
      const currentY = clampLayerValue(
        Math.round(((event.clientY - rect.top) / rect.height) * 1000),
        0,
        1000,
      );
      const rawX = Math.min(startX, currentX);
      const rawY = Math.min(startY, currentY);
      const rawWidth = Math.abs(currentX - startX);
      const rawHeight = Math.abs(currentY - startY);
      const width = clampLayerValue(Math.max(16, rawWidth), 16, 1000);
      const height = clampLayerValue(Math.max(16, rawHeight), 16, 1000);
      const x = clampLayerValue(rawX, 0, Math.max(0, 1000 - width));
      const y = clampLayerValue(rawY, 0, Math.max(0, 1000 - height));
      setSocialLayerFrames((prev) => {
        const current = prev[layerId];
        if (
          current &&
          current.x === x &&
          current.y === y &&
          current.width === width &&
          current.height === height
        ) {
          return prev;
        }
        return {
          ...prev,
          [layerId]: {
            x,
            y,
            width,
            height,
          },
        };
      });
      event.preventDefault();
      return;
    }
    const drag = socialDragStateRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const { layerId, startClientX, startClientY, initialFrame, rect } = drag;
    if (!rect.width || !rect.height) return;
    const deltaX = ((event.clientX - startClientX) / rect.width) * 1000;
    const deltaY = ((event.clientY - startClientY) / rect.height) * 1000;
    setSocialLayerFrames((prev) => {
      const current = prev[layerId] ?? initialFrame;
      const nextX = clampLayerValue(
        Math.round(initialFrame.x + deltaX),
        0,
        Math.max(0, 1000 - current.width),
      );
      const nextY = clampLayerValue(
        Math.round(initialFrame.y + deltaY),
        0,
        Math.max(0, 1000 - current.height),
      );
      if (current.x === nextX && current.y === nextY) return prev;
      return {
        ...prev,
        [layerId]: { ...current, x: nextX, y: nextY },
      };
    });
    event.preventDefault();
  };

  const endSocialLayerDrag = (event) => {
    const resize = socialResizeStateRef.current;
    if (resize && resize.pointerId === event.pointerId) {
      if (event.currentTarget?.releasePointerCapture) {
        try {
          event.currentTarget.releasePointerCapture(event.pointerId);
        } catch {}
      }
      socialResizeStateRef.current = null;
      setSocialDraggingLayer("");
      socialSuppressTextInsertClickRef.current = socialActiveTool === "text";
      event.preventDefault();
      return;
    }

    const draw = socialShapeDrawStateRef.current;
    if (draw && draw.pointerId === event.pointerId) {
      if (event.currentTarget?.releasePointerCapture) {
        try {
          event.currentTarget.releasePointerCapture(event.pointerId);
        } catch {}
      }
      socialShapeDrawStateRef.current = null;
      setSocialDraggingLayer("");
      socialSuppressTextInsertClickRef.current = socialActiveTool === "text";
      event.preventDefault();
      return;
    }
    const drag = socialDragStateRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget?.releasePointerCapture) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {}
    }
    socialDragStateRef.current = null;
    setSocialDraggingLayer("");
    socialSuppressTextInsertClickRef.current = socialActiveTool === "text";
  };

  const socialRenderSelectionBox = (layerId) => {
    if (socialSelectedLayer !== layerId) return null;
    if (!socialLayerVisible[layerId]) return null;
    const frame = socialLayerFrames[layerId];
    if (!frame) return null;
    const showHandles = !socialLayerLocked[layerId];
    return (
      <div
        key={`selection-${layerId}`}
        className="pointer-events-none absolute"
        style={{
          ...socialFrameToStyle(frame),
          zIndex: socialLayerZ(layerId) + 2,
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-md border-2 border-blue-500 ring-1 ring-blue-300" />
        {showHandles
          ? SOCIAL_RESIZE_HANDLES.map((handle) => (
              <button
                key={`${layerId}-${handle.key}`}
                type="button"
                className={`pointer-events-auto absolute h-3 w-3 rounded-full border border-blue-600 bg-white shadow-sm ${handle.className}`}
                title="Resize"
                onPointerDown={(event) =>
                  beginSocialLayerResize(layerId, handle.key, event)
                }
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              />
            ))
          : null}
      </div>
    );
  };

  const socialActivePreviewText = (target) => {
    if (target === "headline") {
      return (
        socialDraft.headline || socialSelectedProduct?.product_name || "Your headline"
      );
    }
    if (target === "start") {
      return socialDraft.start_date || "Start date";
    }
    return (
      resolveTemplateCallToActionText({
        templateStyle: socialDraft.template_style,
        callToAction: socialDraft.call_to_action,
        priceDetail: socialDraft.price_detail,
      }) || "Call to action"
    );
  };

  const socialShapeLayerStyle = (layerId) => {
    const frame = socialLayerFrames[layerId] ?? {
      x: 280,
      y: 100,
      width: 440,
      height: 180,
    };
    return socialShapeStyleFromMeta(frame, getSocialShapeStyleMeta(layerId));
  };
  const socialCurrentShapeKind = isSocialShapeLayer(socialSelectedLayer)
    ? getSocialShapeStyleMeta(socialSelectedLayer).kind ?? socialShapeKind
    : socialShapeKind;

  const socialLayerThumbnail = (layerId) => {
    if (isSocialImageLayer(layerId)) {
      const imageMeta =
        layerId === "media"
          ? socialPreviewMediaResolved
          : socialImageLayers[layerId] ?? null;
      if (!imageMeta?.url) {
        if (layerId === SOCIAL_BRAND_LAYER_ID) {
          return (
            <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-gray-500">
              TXT
            </div>
          );
        }
        return (
          <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-gray-400">
            IMG
          </div>
        );
      }
      if (imageMeta.type === "VIDEO") {
        return (
          <video
            src={imageMeta.url}
            className="h-full w-full object-cover"
            muted
            playsInline
          />
        );
      }
      return (
        <img
          src={imageMeta.url}
          alt=""
          className="h-full w-full object-cover"
        />
      );
    }

    if (isSocialShapeLayer(layerId)) {
      const shapeMeta = getSocialShapeStyleMeta(layerId);
      const shapeBase = {
        backgroundColor: shapeMeta.color ?? "#3aa6d9",
        opacity: Math.max(0, Math.min(100, shapeMeta.opacity ?? 60)) / 100,
        width: "72%",
        height: "72%",
      };
      if (shapeMeta.kind === "circle") {
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div style={{ ...shapeBase, borderRadius: "9999px" }} />
          </div>
        );
      }
      if (shapeMeta.kind === "triangle") {
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div
              style={{ ...shapeBase, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
          </div>
        );
      }
      if (shapeMeta.kind === "diamond") {
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div
              style={{
                ...shapeBase,
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
          </div>
        );
      }
      if (shapeMeta.kind === "arrow") {
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div
              style={{
                ...shapeBase,
                clipPath:
                  "polygon(0% 20%, 68% 20%, 68% 0%, 100% 50%, 68% 100%, 68% 80%, 0% 80%)",
              }}
            />
          </div>
        );
      }
      if (shapeMeta.kind === "banner") {
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div
              style={{
                ...shapeBase,
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 35%, 92% 50%, 100% 65%, 100% 100%, 0% 100%, 0% 65%, 8% 50%, 0% 35%)",
              }}
            />
          </div>
        );
      }
      if (shapeMeta.kind === "rectangle") {
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div style={{ ...shapeBase, borderRadius: "0px" }} />
          </div>
        );
      }
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div style={{ ...shapeBase, borderRadius: "6px" }} />
        </div>
      );
    }

    if (layerId === "headline") {
      return (
        <div className="h-full w-full overflow-hidden rounded bg-gradient-to-b from-cyan-300/80 to-cyan-500/60 p-1">
          <div className="h-2 w-full rounded-sm bg-white/55" />
          <div className="mt-1 h-2 w-5/6 rounded-sm bg-white/90" />
          <div className="mt-1 h-2 w-2/3 rounded-sm bg-white/75" />
        </div>
      );
    }

    if (layerId === "start") {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[82%] overflow-hidden rounded-md border border-white/40 bg-black/45 p-1">
            <div className="h-1.5 w-2/3 rounded-sm bg-white/85" />
            <div className="mt-1 h-1.5 w-full rounded-sm bg-white/70" />
            <div className="mt-1 h-1.5 w-4/5 rounded-sm bg-white/60" />
          </div>
        </div>
      );
    }

    if (layerId === "cta") {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[84%] overflow-hidden rounded-sm border border-white/40 bg-black/35 p-1">
            <div className="h-1.5 w-full rounded-sm bg-white/90" />
            <div className="mt-1 h-1.5 w-4/5 rounded-sm bg-white/70" />
          </div>
        </div>
      );
    }

    if (
      layerId === SOCIAL_BAND_BRAND_LAYER_ID ||
      layerId === SOCIAL_BAND_CONTACT_A_LAYER_ID ||
      layerId === SOCIAL_BAND_CONTACT_B_LAYER_ID ||
      SOCIAL_BAND_TEXT_LAYER_IDS.includes(layerId)
    ) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[84%] overflow-hidden rounded-sm border border-white/40 bg-black/35 p-1">
            <div className="h-1.5 w-full rounded-sm bg-white/90" />
            <div className="mt-1 h-1.5 w-3/4 rounded-sm bg-white/70" />
          </div>
        </div>
      );
    }

    if (isSocialCustomTextLayer(layerId)) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[84%] overflow-hidden rounded-sm border border-white/40 bg-black/35 p-1">
            <div className="h-1.5 w-full rounded-sm bg-white/90" />
            <div className="mt-1 h-1.5 w-3/4 rounded-sm bg-white/70" />
          </div>
        </div>
      );
    }

    return <div className="h-full w-full bg-gray-100" />;
  };

  const socialSelectedImage = useMemo(
    () =>
      socialMediaCandidates.find((item) => item.id === socialSelectedImageId) ??
      null,
    [socialMediaCandidates, socialSelectedImageId],
  );

  const socialApplySelectedImage = () => {
    const nextUrl = socialSelectedImage?.url || socialPreviewOverrideUrl;
    if (!nextUrl) return;
    const nextType = socialSelectedImage?.type || detectSocialMediaTypeFromUrl(nextUrl);
    if (socialImagePickerMode === "replace" && isSocialImageLayer(socialSelectedLayer)) {
      if (socialSelectedLayer === "media") {
        setSocialPreviewOverrideUrl(nextUrl);
      } else {
        setSocialImageLayers((prev) => ({
          ...prev,
          [socialSelectedLayer]: { url: nextUrl, type: nextType },
        }));
      }
      setSocialLayerVisible((prev) => ({ ...prev, [socialSelectedLayer]: true }));
      socialSelectLayer(socialSelectedLayer);
    } else {
      const newLayerId = buildSocialImageLayerId();
      const defaultFrame = {
        x: 220,
        y: 220,
        width: 420,
        height: 280,
      };
      setSocialLayerOrder((prev) => {
        const imageLayerIndexes = prev
          .map((layerId, index) => ({ layerId, index }))
          .filter((entry) => isSocialImageLayer(entry.layerId));
        const insertAt =
          imageLayerIndexes.length > 0
            ? imageLayerIndexes[imageLayerIndexes.length - 1].index + 1
            : 0;
        const next = [...prev];
        next.splice(insertAt, 0, newLayerId);
        return next;
      });
      setSocialLayerVisible((prev) => ({ ...prev, [newLayerId]: true }));
      setSocialLayerLocked((prev) => ({ ...prev, [newLayerId]: false }));
      setSocialLayerFrames((prev) => ({ ...prev, [newLayerId]: defaultFrame }));
      setSocialImageLayers((prev) => ({
        ...prev,
        [newLayerId]: { url: nextUrl, type: nextType },
      }));
      socialSelectLayer(newLayerId);
    }
    setSocialImagePickerOpen(false);
    setSocialImagePickerMode("add");
    setSocialActiveTool("pointer");
  };

  const socialDragToolType = "itutoros:tool:image";

  const socialPreviewDropHandlers = {
    onDragOver: (event) => {
      const hasImageTool = Array.from(event.dataTransfer.types).includes(
        socialDragToolType,
      );
      if (!hasImageTool) return;
      event.preventDefault();
      setSocialPreviewDropActive(true);
    },
    onDragLeave: () => setSocialPreviewDropActive(false),
    onDrop: (event) => {
      const payload = event.dataTransfer.getData(socialDragToolType);
      if (payload !== "image") return;
      event.preventDefault();
      setSocialPreviewDropActive(false);
      setSocialActiveTool("image");
      setSocialImagePickerMode("add");
      setSocialImagePickerOpen(true);
    },
  };

  const socialRenderTextLayer = ({
    keyId,
    layerId = null,
    text = "",
    content = null,
    fallbackSize = 24,
    x = 0,
    y = 0,
    width = 1000,
    height = 200,
    alignX = "left",
    alignY = "top",
    fontWeight = 700,
    backgroundFill = "",
    backgroundOpacity = 0,
    borderRadius = 0,
    paddingLeft = 0,
    paddingRight = 0,
    paddingTop = 0,
    paddingBottom = 0,
    forceTextShadow = "",
    forceTextStroke = null,
    forceTextColor = "",
    forceFontSize = null,
    forceLineHeight = null,
    onClick = null,
  }) => {
    if (layerId && !socialLayerVisible[layerId]) return null;
    const layerFrame = layerId ? socialLayerFrames[layerId] : null;
    const frame = {
      x: layerFrame?.x ?? x,
      y: layerFrame?.y ?? y,
      width: layerFrame?.width ?? width,
      height: layerFrame?.height ?? height,
    };
    const isTargeted = Boolean(layerId);
    const textStyle = isTargeted
      ? previewTextStyle(layerId, fallbackSize)
      : {
          color: "#ffffff",
          fontSize: `${fallbackSize}px`,
          lineHeight: 1.1,
          fontFamily: socialFontFamily,
        };
    const textAlign =
      alignX === "left" ? "left" : alignX === "right" ? "right" : "center";
    const justifyContent =
      alignY === "top" ? "flex-start" : alignY === "bottom" ? "flex-end" : "center";
    const scaledPaddingLeft = scalePreviewValue(paddingLeft, 0);
    const scaledPaddingRight = scalePreviewValue(paddingRight, 0);
    const scaledPaddingTop = scalePreviewValue(paddingTop, 0);
    const scaledPaddingBottom = scalePreviewValue(paddingBottom, 0);
    const scaledBorderRadius = scalePreviewValue(borderRadius, 0);
    const scaledForceFontSize = forceFontSize == null
      ? null
      : scalePreviewValue(forceFontSize, Number(fallbackSize) || 24);
    const scaledForceShadow = forceTextShadow
      ? scaleCssPxValues(forceTextShadow)
      : "";
    const inlineOverrideText =
      layerId && Object.prototype.hasOwnProperty.call(socialInlineTextOverrides, layerId)
        ? socialInlineTextOverrides[layerId]
        : null;
    const resolvedText =
      inlineOverrideText != null ? inlineOverrideText : content ?? String(text || "");
    const isEditableTextLayer = Boolean(layerId && isSocialTextLayer(layerId));
    const layerColorOverride =
      isEditableTextLayer && layerId
        ? String(socialTextColors[layerId] ?? "").trim()
        : "";
    const effectiveColor =
      layerColorOverride || forceTextColor || textStyle.color || "#ffffff";
    const shouldUseForcedFontSize =
      scaledForceFontSize != null &&
      (!isEditableTextLayer ||
        !layerId ||
        socialTextFontSizes[layerId] == null);
    const isInlineEditing = Boolean(
      layerId &&
        socialActiveTool === "text" &&
        socialInlineEditorLayer === layerId,
    );

    return (
      <div
        key={keyId}
        className="absolute"
        style={{
          ...socialFrameToStyle(frame),
          zIndex: layerId ? socialLayerZ(layerId) : 18,
          pointerEvents: "auto",
        }}
      >
        {backgroundFill ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: backgroundFill,
              opacity: Math.max(0, Math.min(1, Number(backgroundOpacity) || 0)),
              borderRadius: `${Math.max(0, scaledBorderRadius)}px`,
            }}
          />
        ) : null}
        <div
          className="relative h-full w-full"
          style={{
            display: "flex",
            justifyContent,
            flexDirection: "column",
            boxSizing: "border-box",
            paddingLeft: `${Math.max(0, scaledPaddingLeft)}px`,
            paddingRight: `${Math.max(0, scaledPaddingRight)}px`,
            paddingTop: `${Math.max(0, scaledPaddingTop)}px`,
            paddingBottom: `${Math.max(0, scaledPaddingBottom)}px`,
          }}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
              if (onClick) onClick();
              else if (layerId) {
                socialSelectLayer(layerId);
                if (socialActiveTool === "text" && isSocialTextLayer(layerId)) {
                  socialBeginInlineTextEdit(layerId, String(text || ""));
                }
              }
            }}
            onPointerDown={(event) => {
              if (!layerId || socialActiveTool === "text") return;
              beginSocialLayerDrag(layerId, event);
            }}
            style={{
              ...textStyle,
              ...(shouldUseForcedFontSize
                ? { fontSize: `${scaledForceFontSize}px` }
                : null),
              ...(scaledForceShadow ? { textShadow: scaledForceShadow } : null),
              ...(forceTextStroke != null
                ? { WebkitTextStroke: forceTextStroke }
                : null),
              textAlign,
              color: effectiveColor,
              lineHeight: forceLineHeight ?? textStyle.lineHeight ?? 1.1,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              fontWeight,
              cursor:
                layerId && !socialLayerLocked[layerId] && socialActiveTool === "pointer"
                  ? "move"
                  : socialActiveTool === "shape"
                    ? "crosshair"
                  : layerId && socialActiveTool === "text" && isSocialTextLayer(layerId)
                    ? "text"
                  : "default",
              touchAction: "none",
            }}
          >
            {isInlineEditing ? (
              <textarea
                className="h-full w-full resize-none bg-transparent outline-none"
                style={{
                  color: effectiveColor,
                  textAlign,
                  fontWeight,
                  lineHeight: forceLineHeight ?? textStyle.lineHeight ?? 1.1,
                  fontFamily: textStyle.fontFamily,
                  ...(shouldUseForcedFontSize
                    ? { fontSize: `${scaledForceFontSize}px` }
                    : null),
                  ...(scaledForceShadow ? { textShadow: scaledForceShadow } : null),
                  ...(forceTextStroke != null
                    ? { WebkitTextStroke: forceTextStroke }
                    : null),
                }}
                value={socialInlineEditorValue}
                onChange={(event) => setSocialInlineEditorValue(event.target.value)}
                onBlur={applySocialInlineTextEdit}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setSocialInlineEditorValue(socialInlineEditorOriginalValue);
                    cancelSocialInlineTextEdit();
                  }
                  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                    event.preventDefault();
                    applySocialInlineTextEdit();
                  }
                }}
                autoFocus
              />
            ) : (
              resolvedText
            )}
          </div>
        </div>
      </div>
    );
  };

  const socialRenderHtmlTextLayer = ({
    keyId,
    layerId = null,
    text = "",
    content = null,
    fallbackSize = 24,
    x = 0,
    y = 0,
    width = 1000,
    height = 200,
    alignX = "left",
    alignY = "top",
    fontWeight = 700,
    paddingLeft = 0,
    paddingRight = 0,
    paddingTop = 0,
    paddingBottom = 0,
    forceTextShadow = "",
    forceTextStroke = null,
    forceTextColor = "",
    forceFontSize = null,
    forceLineHeight = null,
    onClick = null,
  }) => {
    if (layerId && !socialLayerVisible[layerId]) return null;
    const layerFrame = layerId ? socialLayerFrames[layerId] : null;
    const frame = {
      x: layerFrame?.x ?? x,
      y: layerFrame?.y ?? y,
      width: layerFrame?.width ?? width,
      height: layerFrame?.height ?? height,
    };
    const textStyle = layerId
      ? previewTextStyle(layerId, fallbackSize)
      : {
          color: "#ffffff",
          fontSize: `${fallbackSize}px`,
          lineHeight: 1.1,
          fontFamily: socialFontFamily,
        };
    const textAlign =
      alignX === "left" ? "left" : alignX === "right" ? "right" : "center";
    const justifyContent =
      alignY === "top" ? "flex-start" : alignY === "bottom" ? "flex-end" : "center";
    const scaledPaddingLeft = scalePreviewValue(paddingLeft, 0);
    const scaledPaddingRight = scalePreviewValue(paddingRight, 0);
    const scaledPaddingTop = scalePreviewValue(paddingTop, 0);
    const scaledPaddingBottom = scalePreviewValue(paddingBottom, 0);
    const scaledForceFontSize = forceFontSize == null
      ? null
      : scalePreviewValue(forceFontSize, Number(fallbackSize) || 24);
    const scaledForceShadow = forceTextShadow
      ? scaleCssPxValues(forceTextShadow)
      : "";
    const inlineOverrideText =
      layerId && Object.prototype.hasOwnProperty.call(socialInlineTextOverrides, layerId)
        ? socialInlineTextOverrides[layerId]
        : null;
    const resolvedText =
      inlineOverrideText != null ? inlineOverrideText : content ?? String(text || "");
    const isEditableTextLayer = Boolean(layerId && isSocialTextLayer(layerId));
    const layerColorOverride =
      isEditableTextLayer && layerId
        ? String(socialTextColors[layerId] ?? "").trim()
        : "";
    const effectiveColor =
      layerColorOverride || forceTextColor || textStyle.color || "#ffffff";
    const shouldUseForcedFontSize =
      scaledForceFontSize != null &&
      (!isEditableTextLayer ||
        !layerId ||
        socialTextFontSizes[layerId] == null);
    const isInlineEditing = Boolean(
      layerId &&
        socialActiveTool === "text" &&
        socialInlineEditorLayer === layerId,
    );

    return (
      <div
        key={keyId}
        className="absolute"
        style={{
          ...socialFrameToStyle(frame),
          zIndex: layerId ? socialLayerZ(layerId) : 18,
          pointerEvents: "auto",
        }}
      >
        <div
          className="h-full w-full"
          style={{
            display: "flex",
            justifyContent,
            flexDirection: "column",
            boxSizing: "border-box",
            paddingLeft: `${Math.max(0, scaledPaddingLeft)}px`,
            paddingRight: `${Math.max(0, scaledPaddingRight)}px`,
            paddingTop: `${Math.max(0, scaledPaddingTop)}px`,
            paddingBottom: `${Math.max(0, scaledPaddingBottom)}px`,
          }}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
              if (onClick) onClick();
              else if (layerId) {
                socialSelectLayer(layerId);
                if (socialActiveTool === "text" && isSocialTextLayer(layerId)) {
                  socialBeginInlineTextEdit(layerId, String(text || ""));
                }
              }
            }}
            onPointerDown={(event) => {
              if (!layerId || socialActiveTool === "text") return;
              beginSocialLayerDrag(layerId, event);
            }}
            style={{
              ...textStyle,
              ...(shouldUseForcedFontSize
                ? { fontSize: `${scaledForceFontSize}px` }
                : null),
              ...(scaledForceShadow ? { textShadow: scaledForceShadow } : null),
              ...(forceTextStroke != null
                ? { WebkitTextStroke: forceTextStroke }
                : null),
              ...(content ? { display: "block", width: "100%" } : null),
              textAlign,
              color: effectiveColor,
              lineHeight: forceLineHeight ?? textStyle.lineHeight ?? 1.1,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              fontWeight,
              cursor:
                layerId && !socialLayerLocked[layerId] && socialActiveTool === "pointer"
                  ? "move"
                  : socialActiveTool === "shape"
                    ? "crosshair"
                  : layerId && socialActiveTool === "text" && isSocialTextLayer(layerId)
                    ? "text"
                  : "default",
              touchAction: "none",
            }}
          >
            {isInlineEditing ? (
              <textarea
                className="h-full w-full resize-none bg-transparent outline-none"
                style={{
                  color: effectiveColor,
                  textAlign,
                  fontWeight,
                  lineHeight: forceLineHeight ?? textStyle.lineHeight ?? 1.1,
                  fontFamily: textStyle.fontFamily,
                  ...(shouldUseForcedFontSize
                    ? { fontSize: `${scaledForceFontSize}px` }
                    : null),
                  ...(scaledForceShadow ? { textShadow: scaledForceShadow } : null),
                  ...(forceTextStroke != null
                    ? { WebkitTextStroke: forceTextStroke }
                    : null),
                }}
                value={socialInlineEditorValue}
                onChange={(event) => setSocialInlineEditorValue(event.target.value)}
                onBlur={applySocialInlineTextEdit}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setSocialInlineEditorValue(socialInlineEditorOriginalValue);
                    cancelSocialInlineTextEdit();
                  }
                  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                    event.preventDefault();
                    applySocialInlineTextEdit();
                  }
                }}
                autoFocus
              />
            ) : (
              resolvedText
            )}
          </div>
        </div>
      </div>
    );
  };

  const fitBandSingleLineFontSize = ({
    text,
    frame,
    maxFont = 220,
    minFont = 10,
    paddingX = 24,
    paddingY = 10,
    fontWeight = 800,
  }) => {
    const safeText = String(text ?? "").trim();
    if (!safeText) return minFont;
    if (!frame) return minFont;
    if (typeof document === "undefined") return minFont;
    const canvas = document.createElement("canvas");
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return minFont;
    const safeFontFamilyRaw = String(socialFontFamily || "inherit").trim();
    const safeFontFamily =
      safeFontFamilyRaw && safeFontFamilyRaw !== "inherit"
        ? safeFontFamilyRaw
        : "Poppins, sans-serif";
    const availableWidth = Math.max(1, Number(frame.width || 0) - paddingX * 2);
    const availableHeight = Math.max(1, Number(frame.height || 0) - paddingY * 2);
    let low = Math.max(1, Math.floor(minFont));
    let high = Math.max(low, Math.floor(maxFont));
    let best = low;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      ctx2d.font = `${fontWeight} ${mid}px ${safeFontFamily}`;
      const measuredWidth = ctx2d.measureText(safeText).width;
      const measuredHeight = mid * 1.08;
      if (measuredWidth <= availableWidth && measuredHeight <= availableHeight) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return clampLayerValue(best, minFont, maxFont);
  };

  const socialRenderPresetTextLayers = () => {
    if (socialDraft.template_style === "Success story") {
      const hasSuccessStoryLayers = Boolean(
        socialLayerVisible[SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID] ||
          socialLayerVisible[SOCIAL_SUCCESS_CONTACT_LAYER_ID] ||
          socialLayerVisible[SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID],
      );
      if (!hasSuccessStoryLayers) return null;

      const testimonialFrame = socialLayerFrames[SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID] ?? {
        x: 80,
        y: 80,
        width: 840,
        height: 770,
      };
      const brandFrame =
        socialLayerFrames[SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID] ??
        socialLayerFrames[SOCIAL_SUCCESS_BRAND_IMAGE_LAYER_ID] ?? {
          x: 25,
          y: 875,
          width: 450,
          height: 100,
        };
      const contactFrame = socialLayerFrames[SOCIAL_SUCCESS_CONTACT_LAYER_ID] ?? {
        x: 525,
        y: 875,
        width: 450,
        height: 100,
      };

      const companyDisplayName =
        String(socialCompanyNameText ?? "").trim() || "Company Name";
      const contactText =
        String(socialSuccessContactText ?? "").trim() ||
        String(socialBusinessPhoneText ?? "").trim() ||
        String(socialBusinessEmailText ?? "").trim() ||
        "#tutoring";
      const testimonialText =
        String(socialDraft.extra_notes ?? "").trim() ||
        "Share your success story here.";
      const brandAlign = socialSuccessBrandSide === "left" ? "left" : "right";
      const contactAlign = socialSuccessBrandSide === "left" ? "right" : "left";
      const brandColor =
        socialSuccessSideTextColors[socialSuccessBrandSide] ?? "#ffffff";
      const contactColor =
        socialSuccessSideTextColors[
          socialSuccessBrandSide === "left" ? "right" : "left"
        ] ?? "#ffffff";
      const shadowForColor = (color) =>
        color === "#111111"
          ? "0px 3px 10px rgba(255,255,255,0.65)"
          : "0px 3px 10px rgba(0,0,0,0.75)";

      return (
        <>
          {!socialHasBrandLogo
            ? socialRenderHtmlTextLayer({
                keyId: "success-story-brand-text",
                layerId: SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID,
                text: companyDisplayName,
                fallbackSize:
                  socialTextFontSizes[SOCIAL_SUCCESS_BRAND_TEXT_LAYER_ID] ?? 30,
                x: brandFrame.x,
                y: brandFrame.y,
                width: brandFrame.width,
                height: brandFrame.height,
                alignX: brandAlign,
                alignY: "center",
                fontWeight: 800,
                forceTextColor: brandColor,
                forceTextShadow: shadowForColor(brandColor),
                forceLineHeight: 1,
                paddingLeft: brandAlign === "left" ? 8 : 0,
                paddingRight: brandAlign === "right" ? 8 : 0,
              })
            : null}
          {socialRenderHtmlTextLayer({
            keyId: "success-story-contact-text",
            layerId: SOCIAL_SUCCESS_CONTACT_LAYER_ID,
            text: contactText,
            fallbackSize:
              socialTextFontSizes[SOCIAL_SUCCESS_CONTACT_LAYER_ID] ?? 30,
            x: contactFrame.x,
            y: contactFrame.y,
            width: contactFrame.width,
            height: contactFrame.height,
            alignX: contactAlign,
            alignY: "center",
            fontWeight: 700,
            forceTextColor: contactColor,
            forceTextShadow: shadowForColor(contactColor),
            forceLineHeight: 1,
            paddingLeft: contactAlign === "left" ? 8 : 0,
            paddingRight: contactAlign === "right" ? 8 : 0,
          })}
          {socialRenderHtmlTextLayer({
            keyId: "success-story-testimonial-text",
            layerId: SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID,
            text: testimonialText,
            fallbackSize:
              socialTextFontSizes[SOCIAL_SUCCESS_TESTIMONIAL_LAYER_ID] ?? 48,
            x: testimonialFrame.x,
            y: testimonialFrame.y,
            width: testimonialFrame.width,
            height: testimonialFrame.height,
            alignX: "left",
            alignY: "top",
            fontWeight: 700,
            forceTextColor: "#111111",
            forceTextShadow: "none",
            forceLineHeight: 1.15,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 24,
            paddingBottom: 24,
          })}
        </>
      );
    }

    if (socialDraft.layout_preset === "Bold headline") {
      const isAnnouncement = isBoldHeadlineAnnouncementTemplate({
        templateStyle: socialDraft.template_style,
        layoutPreset: socialDraft.layout_preset,
      });
      const topY =
        socialToolAlignY === "top" ? 52 : socialToolAlignY === "bottom" ? 290 : 160;
      const dateX = socialDateComponentSide === "right" ? 650 : 50;
      const layerOneFrame =
        socialLayerFrames[SOCIAL_HEADER_LAYER_ID] ?? socialLayerFrames.headline;
      const dateY = clampLayerValue(
        ((layerOneFrame?.y ?? 0) + (layerOneFrame?.height ?? 0)) + 50,
        0,
        670,
      );
      const dateWidth = 300;
      const dateHeight = 250;
      const startDateText = String(socialDraft.start_date ?? "").trim();
      const endDateText = String(socialDraft.end_date ?? "").trim();
      const normalizeMdyShort = (value: string) => {
        const v = String(value ?? "").trim();
        if (!v) return "";
        const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!m) return v;
        const mm = Number.parseInt(m[2] ?? "0", 10);
        const dd = Number.parseInt(m[3] ?? "0", 10);
        const yy = Number.parseInt((m[1] ?? "00").slice(-2), 10);
        if (!mm || !dd) return v;
        return `${mm}/${dd}/${yy.toString().padStart(2, "0")}`;
      };
      const startShort = normalizeMdyShort(startDateText);
      const endShort = normalizeMdyShort(endDateText);
      const useRangeFormat =
        isAnnouncement &&
        socialDateTextFormat === "range" &&
        startDateText.length > 0 &&
        endDateText.length > 0;
      const dateLineText =
        !startDateText && !endDateText
          ? "Starting\nSoon"
          : useRangeFormat
            ? `${startShort} -\n${endShort}`
            : `Starting\n${startShort || "Soon"}`;
      const announcementDateFontPt = Math.max(
        8,
        Number(
          socialTextFontSizes.start ??
            announcementDefaultsByAspect(socialDraft.aspect_ratio).dateFont ??
            SOCIAL_ANNOUNCEMENT_DATE_FONT_PT,
        ) || SOCIAL_ANNOUNCEMENT_DATE_FONT_PT,
      );
      const brandAlignX = socialFooterBrandSide === "right" ? "right" : "left";
      const brandPaddingLeft = socialFooterBrandSide === "right" ? 0 : 20;
      const brandPaddingRight = socialFooterBrandSide === "right" ? 20 : 0;
      const contactAlignX = socialFooterBrandSide === "right" ? "left" : "right";
      const contactPaddingLeft = socialFooterBrandSide === "right" ? 10 : 0;
      const contactPaddingRight = socialFooterBrandSide === "right" ? 0 : 10;
      const footerInfoText = resolveBoldHeadlineFooterText({
        templateStyle: socialDraft.template_style,
        layoutPreset: socialDraft.layout_preset,
        headlineText: socialDraft.headline,
        callToAction: socialDraft.call_to_action,
        priceDetail: socialDraft.price_detail,
        startDate: socialDraft.start_date,
        productName: socialSelectedProduct?.product_name,
        announcementFooterText: socialAnnouncementFooterInfo.text,
      });
      const footerInfoFontPt = Math.max(
        8,
        Number(
          socialTextFontSizes.cta ??
            resolveAnnouncementFooterInfoFontPt(footerInfoText),
        ) || resolveAnnouncementFooterInfoFontPt(footerInfoText),
      );
      const effectiveFooterFrame =
        socialLayerFrames[SOCIAL_FOOTER_LAYER_ID] ?? resolveAnnouncementFooterFrame();
      const footerInfoFrame = resolveAnnouncementFooterInfoFrame({
        text: footerInfoText,
        fontSize: footerInfoFontPt,
        footerFrame: effectiveFooterFrame,
      });
      const footerInfoShadowCss = `6px 6px 8px ${socialFooterInfoShadowColor}`;
      const headlinePaddingLeft = socialToolAlignX === "left" ? 15 : 0;
      const headlinePaddingRight = socialToolAlignX === "right" ? 15 : 0;
      return (
        <>
          {socialRenderTextLayer({
            keyId: "bold-headline",
            layerId: "headline",
            text: socialRenderedLayerText("headline"),
            fallbackSize: isAnnouncement ? 75 : 48,
            x: 55,
            y: topY,
            width: 890,
            height: 250,
            alignX: socialToolAlignX,
            alignY: "center",
            fontWeight: 800,
            paddingLeft: headlinePaddingLeft,
            paddingRight: headlinePaddingRight,
            paddingTop: isAnnouncement ? 0 : 0,
            paddingBottom: isAnnouncement ? 0 : 0,
            forceLineHeight: isAnnouncement ? 0.9 : null,
          })}
          {isAnnouncement
            ? socialRenderHtmlTextLayer({
                keyId: "announcement-date-text",
                layerId: "start",
                text: dateLineText,
                fallbackSize: announcementDateFontPt,
                forceFontSize: announcementDateFontPt,
                x: dateX,
                y: dateY,
                width: dateWidth,
                height: dateHeight,
                alignX: socialDateTextAlign,
                alignY: "center",
                fontWeight: 700,
                paddingLeft: socialDateTextAlign === "left" ? 10 : 0,
                paddingTop: 0,
                paddingBottom: 0,
                forceLineHeight: 1,
                forceTextShadow: "6px 6px 6px rgba(0, 0, 0, 0.7)",
              })
            : null}
          {isAnnouncement && !socialHasBrandLogo
            ? socialRenderTextLayer({
                keyId: "announcement-brand-text",
                layerId: SOCIAL_BRAND_LAYER_ID,
                text: socialCompanyNameText,
                fallbackSize: 30,
                x: effectiveFooterFrame.x,
                y: effectiveFooterFrame.y,
                width: effectiveFooterFrame.width,
                height: effectiveFooterFrame.height,
                alignX: brandAlignX,
                alignY: "center",
                fontWeight: 700,
                paddingLeft: brandPaddingLeft,
                paddingRight: brandPaddingRight,
              })
            : null}
          {isAnnouncement
            ? socialRenderHtmlTextLayer({
                keyId: "announcement-contact",
                layerId: SOCIAL_CONTACT_LAYER_ID,
                text: socialFooterContactText,
                fallbackSize: 30,
                x: effectiveFooterFrame.x,
                y: effectiveFooterFrame.y,
                width: effectiveFooterFrame.width,
                height: effectiveFooterFrame.height,
                alignX: contactAlignX,
                alignY: "center",
                fontWeight: 700,
                paddingLeft: contactPaddingLeft,
                paddingRight: contactPaddingRight,
                forceLineHeight: 1,
              })
            : socialRenderTextLayer({
                keyId: "bold-cta",
                layerId: "cta",
                text: socialDraft.call_to_action || socialDraft.start_date || "Call to action",
                fallbackSize: 20,
                x: 55,
                y: topY + 260,
                width: 890,
                height: 220,
                alignX: socialToolAlignX,
                alignY: "top",
                fontWeight: 700,
              })}
          {isAnnouncement
            ? socialRenderHtmlTextLayer({
                keyId: "announcement-footer-info",
                layerId: "cta",
                text: footerInfoText,
                fallbackSize: footerInfoFontPt,
                x: footerInfoFrame.x,
                y: footerInfoFrame.y,
                width: footerInfoFrame.width,
                height: footerInfoFrame.height,
                alignX: "center",
                alignY: "bottom",
                fontWeight: 800,
                paddingBottom: 8,
                forceTextColor: socialFooterInfoTextColor,
                forceTextShadow: footerInfoShadowCss,
                forceLineHeight: 1.1,
              })
            : null}
        </>
      );
    }

    if (socialDraft.layout_preset === "Band rows") {
      const isSeasonalPromoTemplate =
        socialDraft.template_style === "Seasonal promo";
      const band1Frame = socialLayerFrames["band-1"];
      const band2Frame = socialLayerFrames["band-2"];
      const band3Frame = socialLayerFrames["band-3"];
      const band4Frame = socialLayerFrames["band-4"];
      if (!band1Frame || !band2Frame || !band3Frame || !band4Frame) return null;
      const bandText1Frame = socialLayerFrames[SOCIAL_BAND_TEXT_LAYER_IDS[0]] ?? band1Frame;
      const bandText2Frame = socialLayerFrames[SOCIAL_BAND_TEXT_LAYER_IDS[1]] ?? band2Frame;
      const bandText3Frame = socialLayerFrames[SOCIAL_BAND_TEXT_LAYER_IDS[2]] ?? band3Frame;
      const bandText4Frame = socialLayerFrames[SOCIAL_BAND_TEXT_LAYER_IDS[3]] ?? band4Frame;
      const bandBrandFrame = socialLayerFrames[SOCIAL_BAND_BRAND_LAYER_ID] ?? {
        x: 50,
        y: 25,
        width: 900,
        height: 100,
      };
      const bandContactAFrame = socialLayerFrames[SOCIAL_BAND_CONTACT_A_LAYER_ID] ?? {
        x: 25,
        y: 875,
        width: 450,
        height: 100,
      };
      const bandContactBFrame = socialLayerFrames[SOCIAL_BAND_CONTACT_B_LAYER_ID] ?? {
        x: 525,
        y: 875,
        width: 450,
        height: 100,
      };

      const normalizeMdyShort = (value) => {
        const v = String(value ?? "").trim();
        if (!v) return "";
        const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!m) return v;
        const mm = Number.parseInt(m[2] ?? "0", 10);
        const dd = Number.parseInt(m[3] ?? "0", 10);
        const yy = Number.parseInt((m[1] ?? "00").slice(-2), 10);
        if (!mm || !dd) return v;
        return `${mm}/${dd}/${yy.toString().padStart(2, "0")}`;
      };

      const bandRowsSwappedText = resolveEnrollmentSwappedOfferText({
        templateStyle: socialDraft.template_style,
        headlineText: socialDraft.headline,
        callToAction: socialDraft.call_to_action,
        priceDetail: socialDraft.price_detail,
        startDate: socialDraft.start_date,
        productName: socialSelectedProduct?.product_name,
      });
      const headlineText = String(
        bandRowsSwappedText.headline ||
          socialSelectedProduct?.product_name ||
          "Add Headline",
      ).trim();
      const startShort = normalizeMdyShort(socialDraft.start_date);
      const endShort = normalizeMdyShort(socialDraft.end_date);
      const priceText = String(socialDraft.price_detail ?? "").trim();
      const dateCore =
        startShort && endShort
          ? `${startShort} - ${endShort}`
          : startShort
            ? `Starting ${startShort}`
            : "";
      const band2Text = isSeasonalPromoTemplate
        ? dateCore
        : [dateCore, priceText ? `${" ".repeat(6)}${priceText}` : ""]
            .filter(Boolean)
            .join("");

      const locationText = String(socialDraft.location_detail ?? "").trim();
      const ageText = String(socialDraft.age_range ?? "").trim();
      const ctaText = String(bandRowsSwappedText.cta ?? "").trim();
      const band3Text = ageText || locationText || "";
      const band4Text = ctaText || (band3Text === locationText ? "" : locationText) || "";

      const alignX = socialBandRowsAlign;
      const textShadow = "5px 5px 8px rgba(0,0,0,0.9)";
      const contactTextShadow = "4px 4px 6px rgba(0,0,0,0.8)";
      const textPaddingLeft = alignX === "left" ? 24 : 0;
      const brandPaddingLeft = socialBandBrandAlign === "left" ? 16 : 0;
      const contactAPaddingLeft = socialBandContactAlign.contactA === "left" ? 12 : 0;
      const contactBPaddingLeft = socialBandContactAlign.contactB === "left" ? 12 : 0;
      const contactAText = String(
        socialBandContactText.contactA ??
          socialBusinessPhoneText ??
          socialBusinessEmailText ??
          "#tutoring",
      ).trim();
      const contactBText = String(
        socialBandContactText.contactB ??
          socialBusinessEmailText ??
          socialBusinessPhoneText ??
          "#tutoring",
      ).trim();

      const band1Font = fitBandSingleLineFontSize({
        text: headlineText,
        frame: bandText1Frame,
        maxFont: 220,
        minFont: 10,
      });
      const band2Font = fitBandSingleLineFontSize({
        text: band2Text,
        frame: bandText2Frame,
        maxFont: 220,
        minFont: 10,
      });
      const band3Font = fitBandSingleLineFontSize({
        text: band3Text,
        frame: bandText3Frame,
        maxFont: 220,
        minFont: 10,
      });
      const band4Font = fitBandSingleLineFontSize({
        text: band4Text,
        frame: bandText4Frame,
        maxFont: 220,
        minFont: 10,
      });
      const bandBrandFont = fitBandSingleLineFontSize({
        text: socialCompanyNameText,
        frame: bandBrandFrame,
        maxFont: 110,
        minFont: 10,
      });
      const bandContactAFont = fitBandSingleLineFontSize({
        text: contactAText,
        frame: bandContactAFrame,
        maxFont: 110,
        minFont: 10,
      });
      const bandContactBFont = fitBandSingleLineFontSize({
        text: contactBText,
        frame: bandContactBFrame,
        maxFont: 110,
        minFont: 10,
      });

      return (
        <>
          {!socialHasBrandLogo
            ? socialRenderHtmlTextLayer({
                keyId: "band-row-brand-text",
                layerId: SOCIAL_BAND_BRAND_LAYER_ID,
                text: socialCompanyNameText,
                fallbackSize: bandBrandFont,
                x: bandBrandFrame.x,
                y: bandBrandFrame.y,
                width: bandBrandFrame.width,
                height: bandBrandFrame.height,
                alignX: socialBandBrandAlign,
                alignY: "center",
                fontWeight: 700,
                forceTextColor: "#ffffff",
                forceTextShadow: contactTextShadow,
                forceLineHeight: 1,
                paddingLeft: brandPaddingLeft,
              })
            : null}
          {socialRenderHtmlTextLayer({
            keyId: "band-row-contact-a",
            layerId: SOCIAL_BAND_CONTACT_A_LAYER_ID,
            text: contactAText,
            fallbackSize: bandContactAFont,
            x: bandContactAFrame.x,
            y: bandContactAFrame.y,
            width: bandContactAFrame.width,
            height: bandContactAFrame.height,
            alignX: socialBandContactAlign.contactA,
            alignY: "center",
            fontWeight: 700,
            forceTextColor: "#d1d5db",
            forceTextShadow: contactTextShadow,
            forceLineHeight: 1,
            paddingLeft: contactAPaddingLeft,
          })}
          {socialRenderHtmlTextLayer({
            keyId: "band-row-contact-b",
            layerId: SOCIAL_BAND_CONTACT_B_LAYER_ID,
            text: contactBText,
            fallbackSize: bandContactBFont,
            x: bandContactBFrame.x,
            y: bandContactBFrame.y,
            width: bandContactBFrame.width,
            height: bandContactBFrame.height,
            alignX: socialBandContactAlign.contactB,
            alignY: "center",
            fontWeight: 700,
            forceTextColor: "#d1d5db",
            forceTextShadow: contactTextShadow,
            forceLineHeight: 1,
            paddingLeft: contactBPaddingLeft,
          })}
          {socialRenderHtmlTextLayer({
            keyId: "band-row-1-text",
            layerId: SOCIAL_BAND_TEXT_LAYER_IDS[0],
            text: headlineText,
            fallbackSize: band1Font,
            x: bandText1Frame.x,
            y: bandText1Frame.y,
            width: bandText1Frame.width,
            height: bandText1Frame.height,
            alignX,
            alignY: "center",
            fontWeight: 800,
            forceTextColor: "#ffffff",
            forceTextShadow: textShadow,
            forceLineHeight: 1,
            paddingLeft: textPaddingLeft,
          })}
          {socialRenderHtmlTextLayer({
            keyId: "band-row-2-text",
            layerId: SOCIAL_BAND_TEXT_LAYER_IDS[1],
            text: band2Text,
            fallbackSize: band2Font,
            x: bandText2Frame.x,
            y: bandText2Frame.y,
            width: bandText2Frame.width,
            height: bandText2Frame.height,
            alignX,
            alignY: "center",
            fontWeight: 800,
            forceTextColor: "#ffffff",
            forceTextShadow: textShadow,
            forceLineHeight: 1,
            paddingLeft: textPaddingLeft,
          })}
          {socialRenderHtmlTextLayer({
            keyId: "band-row-3-text",
            layerId: SOCIAL_BAND_TEXT_LAYER_IDS[2],
            text: band3Text,
            fallbackSize: band3Font,
            x: bandText3Frame.x,
            y: bandText3Frame.y,
            width: bandText3Frame.width,
            height: bandText3Frame.height,
            alignX,
            alignY: "center",
            fontWeight: 800,
            forceTextColor: "#ffffff",
            forceTextShadow: textShadow,
            forceLineHeight: 1,
            paddingLeft: textPaddingLeft,
          })}
          {socialRenderHtmlTextLayer({
            keyId: "band-row-4-text",
            layerId: SOCIAL_BAND_TEXT_LAYER_IDS[3],
            text: band4Text,
            fallbackSize: band4Font,
            x: bandText4Frame.x,
            y: bandText4Frame.y,
            width: bandText4Frame.width,
            height: bandText4Frame.height,
            alignX,
            alignY: "center",
            fontWeight: 800,
            forceTextColor: "#ffffff",
            forceTextShadow: textShadow,
            forceLineHeight: 1,
            paddingLeft: textPaddingLeft,
          })}
        </>
      );
    }

    if (socialDraft.layout_preset === "Photo + footer") {
      const isSeasonalPromoTemplate =
        socialDraft.template_style === "Seasonal promo";
      const hasPhotoFooterPresetLayers = Boolean(
        socialLayerVisible[SOCIAL_FOOTER_LAYER_ID] ||
          socialLayerVisible.headline ||
          socialLayerVisible.cta ||
          socialLayerVisible.start ||
          socialLayerVisible[SOCIAL_CONTACT_LAYER_ID],
      );
      if (!hasPhotoFooterPresetLayers) return null;
      const headlineFrame = socialLayerFrames.headline ?? {
        x: 0,
        y: 100,
        width: 1000,
        height: 220,
      };
      const dateFrame = socialLayerFrames.start ?? {
        x: 0,
        y: 700,
        width: 1000,
        height: 100,
      };
      const locationPriceFrame = socialLayerFrames[SOCIAL_CONTACT_LAYER_ID] ?? {
        x: 0,
        y: 825,
        width: 1000,
        height: 75,
      };
      const bottomFrame = socialLayerFrames.cta ?? {
        x: 0,
        y: 925,
        width: 1000,
        height: 75,
      };
      const brandFrame = socialLayerFrames[SOCIAL_BRAND_LAYER_ID] ?? {
        x: 40,
        y: 20,
        width: 920,
        height: socialHasBrandLogo ? 100 : 75,
      };
      const photoFooterSwappedText = resolveEnrollmentSwappedOfferText({
        templateStyle: socialDraft.template_style,
        headlineText: socialDraft.headline,
        callToAction: socialDraft.call_to_action,
        priceDetail: socialDraft.price_detail,
        startDate: socialDraft.start_date,
        productName: socialSelectedProduct?.product_name,
      });
      const photoFooterHeadlineText = resolvePhotoFooterHeadlineText({
        templateStyle: socialDraft.template_style,
        headlineText: isSeasonalPromoTemplate
          ? resolveTemplateCallToActionText({
              templateStyle: socialDraft.template_style,
              callToAction: socialDraft.call_to_action,
              priceDetail: socialDraft.price_detail,
            })
          : photoFooterSwappedText.headline,
        locationText: socialDraft.location_detail,
        startDate: socialDraft.start_date,
        endDate: socialDraft.end_date,
      });
      const photoFooterBrandText = socialCompanyNameText;
      const photoFooterDateText = resolvePhotoFooterDateLineText({
        startDate: socialDraft.start_date,
        endDate: socialDraft.end_date,
      });
      const photoFooterLocationPriceText = resolvePhotoFooterLocationPriceText({
        locationText: socialDraft.location_detail,
        priceText: isSeasonalPromoTemplate
          ? String(photoFooterSwappedText.headline ?? "").trim()
          : socialDraft.price_detail,
      });
      const effectiveBottomMode: "cta" | "contact" = isSeasonalPromoTemplate
        ? "contact"
        : socialPhotoFooterBottomMode;
      const photoFooterBottomText = resolvePhotoFooterBottomLineText({
        mode: effectiveBottomMode,
        callToAction: photoFooterSwappedText.cta,
        phoneText: socialBusinessPhoneText,
        emailText: socialBusinessEmailText,
      });
      const photoFooterAlign = socialPhotoFooterAlign === "left" ? "left" : "center";
      const photoFooterBrandAlign =
        socialPhotoFooterBrandAlign === "left"
          ? "left"
          : socialPhotoFooterBrandAlign === "right"
            ? "right"
            : "center";
      const photoFooterShadow = "0px 4px 10px rgba(0,0,0,0.85)";
      const dateFitFont = fitBandSingleLineFontSize({
        text: photoFooterDateText,
        frame: dateFrame,
        maxFont: 220,
        minFont: 10,
        paddingX: 12,
        paddingY: 8,
        fontWeight: 800,
      });
      const locationPriceFitFont = fitBandSingleLineFontSize({
        text: photoFooterLocationPriceText,
        frame: locationPriceFrame,
        maxFont: 220,
        minFont: 10,
        paddingX: 12,
        paddingY: 8,
        fontWeight: 800,
      });
      const bottomFitFont = fitBandSingleLineFontSize({
        text: photoFooterBottomText,
        frame: bottomFrame,
        maxFont: 220,
        minFont: 10,
        paddingX: 12,
        paddingY: 8,
        fontWeight: 800,
      });
      const brandFitFont = fitBandSingleLineFontSize({
        text: photoFooterBrandText,
        frame: brandFrame,
        maxFont: 220,
        minFont: 10,
        paddingX: 12,
        paddingY: 8,
        fontWeight: 800,
      });
      const headlineRequestedFont = Math.max(
        8,
        Number(socialTextFontSizes.headline ?? 150) || 150,
      );
      const dateRequestedFont = Math.max(
        8,
        Number(socialTextFontSizes.start ?? dateFitFont) ||
          dateFitFont,
      );
      const locationPriceRequestedFont = Math.max(
        8,
        Number(
          socialTextFontSizes[SOCIAL_CONTACT_LAYER_ID] ?? locationPriceFitFont,
        ) || locationPriceFitFont,
      );
      const bottomRequestedFont = Math.max(
        8,
        Number(socialTextFontSizes.cta ?? bottomFitFont) || bottomFitFont,
      );
      const dateFont = dateRequestedFont;
      const locationPriceFont = locationPriceRequestedFont;
      const bottomFont = bottomRequestedFont;
      const brandRequestedFont = Math.max(
        8,
        Number(socialTextFontSizes[SOCIAL_BRAND_LAYER_ID] ?? brandFitFont) || brandFitFont,
      );
      const leftPadding = photoFooterAlign === "left" ? 10 : 0;
      const rightPadding = photoFooterAlign === "left" ? 10 : 0;
      const brandPaddingLeft = photoFooterBrandAlign === "left" ? 10 : 0;
      const brandPaddingRight = photoFooterBrandAlign === "right" ? 10 : 0;
      return (
        <>
          {!socialHasBrandLogo
            ? socialRenderHtmlTextLayer({
                keyId: "photo-brand",
                layerId: SOCIAL_BRAND_LAYER_ID,
                text: photoFooterBrandText,
                fallbackSize: brandRequestedFont,
                forceFontSize: brandRequestedFont,
                x: brandFrame.x,
                y: brandFrame.y,
                width: brandFrame.width,
                height: brandFrame.height,
                alignX: photoFooterBrandAlign,
                alignY: "center",
                fontWeight: 800,
                forceTextColor: "#ffffff",
                forceTextStroke: "0px transparent",
                forceTextShadow: photoFooterShadow,
                forceLineHeight: 1,
                paddingLeft: brandPaddingLeft,
                paddingRight: brandPaddingRight,
              })
            : null}
          {socialRenderHtmlTextLayer({
            keyId: "photo-headline",
            layerId: "headline",
            text: photoFooterHeadlineText,
            fallbackSize: headlineRequestedFont,
            forceFontSize: headlineRequestedFont,
            x: headlineFrame.x,
            y: headlineFrame.y,
            width: headlineFrame.width,
            height: headlineFrame.height,
            alignX: "center",
            alignY: "center",
            fontWeight: 800,
            forceTextColor: "rgba(255, 255, 255, 0.70)",
            forceTextStroke: "0px transparent",
            forceTextShadow: "none",
            forceLineHeight: 1,
          })}
          {socialRenderHtmlTextLayer({
            keyId: "photo-date-line",
            layerId: "start",
            text: photoFooterDateText,
            fallbackSize: dateFont,
            forceFontSize: dateFont,
            x: dateFrame.x,
            y: dateFrame.y,
            width: dateFrame.width,
            height: dateFrame.height,
            alignX: photoFooterAlign,
            alignY: "center",
            fontWeight: 800,
            forceTextColor: "#ffffff",
            forceTextStroke: "0px transparent",
            forceTextShadow: photoFooterShadow,
            forceLineHeight: 1,
            paddingLeft: leftPadding,
            paddingRight: rightPadding,
          })}
          {socialRenderHtmlTextLayer({
            keyId: "photo-location-price-line",
            layerId: SOCIAL_CONTACT_LAYER_ID,
            text: photoFooterLocationPriceText,
            fallbackSize: locationPriceFont,
            forceFontSize: locationPriceFont,
            x: locationPriceFrame.x,
            y: locationPriceFrame.y,
            width: locationPriceFrame.width,
            height: locationPriceFrame.height,
            alignX: photoFooterAlign,
            alignY: "center",
            fontWeight: 800,
            forceTextColor: "#ffffff",
            forceTextStroke: "0px transparent",
            forceTextShadow: photoFooterShadow,
            forceLineHeight: 1,
            paddingLeft: leftPadding,
            paddingRight: rightPadding,
          })}
          {socialRenderHtmlTextLayer({
            keyId: "photo-bottom-line",
            layerId: "cta",
            text: photoFooterBottomText,
            fallbackSize: bottomFont,
            forceFontSize: bottomFont,
            x: bottomFrame.x,
            y: bottomFrame.y,
            width: bottomFrame.width,
            height: bottomFrame.height,
            alignX: photoFooterAlign,
            alignY: "center",
            fontWeight: 800,
            forceTextColor: "#ffffff",
            forceTextStroke: "0px transparent",
            forceTextShadow: photoFooterShadow,
            forceLineHeight: 1,
            paddingLeft: leftPadding,
            paddingRight: rightPadding,
          })}
        </>
      );
    }

    if (socialDraft.layout_preset === "Schedule list") {
      const scheduleDates = socialDraft.start_date
        ? `Dates: ${socialDraft.start_date}${socialDraft.end_date ? ` - ${socialDraft.end_date}` : ""}`
        : "Dates / schedule";
      const notesText =
        socialDraft.extra_notes ||
        "Monday: Activity\nTuesday: Activity\nWednesday: Activity";
      return (
        <>
          {socialRenderTextLayer({
            keyId: "schedule-start",
            layerId: "start",
            text: scheduleDates,
            fallbackSize: 22,
            x: 40,
            y: 60,
            width: 500,
            height: 140,
            alignX: "left",
            alignY: "center",
            fontWeight: 700,
            backgroundFill: "#000000",
            backgroundOpacity: 0.5,
            borderRadius: 16,
          })}
          {socialRenderTextLayer({
            keyId: "schedule-notes",
            layerId: null,
            text: notesText,
            fallbackSize: 16,
            x: 40,
            y: 220,
            width: 920,
            height: 280,
            alignX: "left",
            alignY: "top",
            fontWeight: 500,
            backgroundFill: "#000000",
            backgroundOpacity: 0.4,
            borderRadius: 16,
          })}
        </>
      );
    }

    return null;
  };

  return (
    <>
                {(activeTab === "PRODUCTS" || activeTab === "MARKETING") && (
                  <div className="grid gap-6">
                    {activeTab === "PRODUCTS" ? (
                      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap gap-2">
                          {CONTENT_STUDIO_TABS.map((tab) => (
                            <button
                              key={tab.key}
                              type="button"
                              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                marketingTab === tab.key
                                  ? "bg-[#0b1f5f] text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                              onClick={() => setMarketingTab(tab.key)}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>
                        <p className="mt-3 text-sm text-gray-600">
                          Manage content used in marketing and website design.
                        </p>
                      </div>
                    ) : null}

                    {activeTab === "PRODUCTS" &&
                    marketingTab === "IMAGE_LIBRARY" ? (
                      <div className="grid gap-4">
                        <div>
                          <div className="text-lg font-semibold text-[#0b1f5f]">
                            Image library
                          </div>
                          <div className="text-sm text-gray-600">
                            Upload and manage reusable images and videos for all
                            designers.
                          </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="text-sm text-gray-700">
                              Images per page
                            </label>
                            <select
                              className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
                              value={imageLibraryPerPage}
                              onChange={(e) => {
                                setImageLibraryPerPage(
                                  Math.max(
                                    1,
                                    Number.parseInt(e.target.value, 10) || 24,
                                  ),
                                );
                                setImageLibraryPage(1);
                              }}
                            >
                              {[12, 24, 36, 48, 72].map((count) => (
                                <option key={count} value={count}>
                                  {count}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              className="itutoros-settings-btn itutoros-settings-btn-secondary !px-3 !py-1.5"
                              onClick={() => setImageLibraryPage(1)}
                              disabled={imageLibraryPageSafe <= 1}
                            >
                              First
                            </button>
                            <button
                              type="button"
                              className="itutoros-settings-btn itutoros-settings-btn-secondary !px-3 !py-1.5"
                              onClick={() =>
                                setImageLibraryPage((prev) =>
                                  Math.max(1, prev - 1),
                                )
                              }
                              disabled={imageLibraryPageSafe <= 1}
                            >
                              Previous
                            </button>
                            <div className="rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-700">
                              Page {imageLibraryPageSafe} of{" "}
                              {imageLibraryTotalPages}
                            </div>
                            <button
                              type="button"
                              className="itutoros-settings-btn itutoros-settings-btn-secondary !px-3 !py-1.5"
                              onClick={() =>
                                setImageLibraryPage((prev) =>
                                  Math.min(imageLibraryTotalPages, prev + 1),
                                )
                              }
                              disabled={
                                imageLibraryPageSafe >= imageLibraryTotalPages
                              }
                            >
                              Next
                            </button>
                            <button
                              type="button"
                              className="itutoros-settings-btn itutoros-settings-btn-secondary !px-3 !py-1.5"
                              onClick={() =>
                                setImageLibraryPage(imageLibraryTotalPages)
                              }
                              disabled={
                                imageLibraryPageSafe >= imageLibraryTotalPages
                              }
                            >
                              Last
                            </button>
                            <div className="ml-auto flex items-center gap-2">
                              <label className="itutoros-settings-btn itutoros-settings-btn-primary cursor-pointer">
                                Upload image
                                <input
                                  type="file"
                                  accept="image/*,video/*"
                                  multiple
                                  className="hidden"
                                  onChange={(e) => {
                                    const files = Array.from(
                                      e.target.files ?? [],
                                    );
                                    files.forEach((file) => {
                                      const mediaType = file.type.startsWith(
                                        "video/",
                                      )
                                        ? "VIDEO"
                                        : "PHOTO";
                                      void handleMediaFileUpload({
                                        kind: "product",
                                        id: GLOBAL_LIBRARY_ID,
                                        scope: "global",
                                        file,
                                        media_type: mediaType,
                                      });
                                    });
                                  }}
                                />
                              </label>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <Input
                              value={imageLibraryUrlDraft}
                              onChange={(e) =>
                                setImageLibraryUrlDraft(e.target.value)
                              }
                              placeholder="Paste image or video URL"
                              className="min-w-[240px] flex-1"
                            />
                            <button
                              type="button"
                              className="itutoros-settings-btn itutoros-settings-btn-secondary"
                              onClick={async () => {
                                const media_url = imageLibraryUrlDraft.trim();
                                if (!media_url) return;
                                const lower = media_url.toLowerCase();
                                const media_type =
                                  lower.endsWith(".mp4") ||
                                  lower.endsWith(".mov") ||
                                  lower.endsWith(".webm")
                                    ? "VIDEO"
                                    : "PHOTO";
                                await addCatalogMedia({
                                  kind: "product",
                                  id: GLOBAL_LIBRARY_ID,
                                  scope: "global",
                                  media_url,
                                  media_type,
                                });
                                setImageLibraryUrlDraft("");
                              }}
                            >
                              Add URL
                            </button>
                          </div>

                          <div className="mt-4 max-h-[480px] overflow-auto rounded-xl border border-gray-200 p-3">
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                              {imageLibraryPageRows.map((media) => (
                                <div
                                  key={media.id}
                                  className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                                >
                                  {media.media_type === "VIDEO" ? (
                                    <video
                                      src={media.media_url}
                                      className="h-full w-full object-cover"
                                      controls
                                    />
                                  ) : (
                                    <img
                                      src={media.media_url}
                                      alt={media.caption_text ?? "Library media"}
                                      className="h-full w-full object-cover"
                                    />
                                  )}
                                  <button
                                    type="button"
                                    className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-rose-600 shadow"
                                    onClick={() => {
                                      void removeCatalogMedia(media.id, () =>
                                        loadCatalogMedia({
                                          kind: "product",
                                          id: GLOBAL_LIBRARY_ID,
                                          scope: "global",
                                        }),
                                      );
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {activeTab === "PRODUCTS" && marketingTab === "PRODUCTS" ? (
                      <div className="grid gap-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="text-lg font-semibold text-[#0b1f5f]">
                              Products
                            </div>
                            <div className="text-sm text-gray-600">
                              Create marketing-ready offerings tied to your
                              active service types.
                            </div>
                          </div>
                          <button
                            type="button"
                            className="itutoros-settings-btn itutoros-settings-btn-secondary"
                            onClick={() => selectProduct(null)}
                          >
                            New product
                          </button>
                        </div>

                        <div className="itutoros-carousel">
                          <button
                            type="button"
                            className={`itutoros-card-1 itutoros-carousel-card border-dashed text-left ${
                              !productDraft.id && !productDraft.product_name
                                ? "ring-2 ring-[#0b1f5f]"
                                : ""
                            }`}
                            onClick={() => selectProduct(null)}
                          >
                            <div className="text-sm font-semibold text-[#0b1f5f]">
                              Add new product
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              Start a new product card for marketing and
                              scheduling.
                            </div>
                          </button>
                          {products.map((product) => {
                            const isActive = productDraft.id === product.id;
                            const service = product.service_code
                              ? marketingServiceByCode.get(product.service_code)
                              : null;
                            const initials = product.product_name
                              ? product.product_name.slice(0, 2).toUpperCase()
                              : "PR";
                            return (
                              <button
                                key={product.id}
                                type="button"
                                className={`itutoros-card-1 itutoros-carousel-card text-left ${
                                  isActive ? "ring-2 ring-[#0b1f5f]" : ""
                                }`}
                                onClick={() => selectProduct(product)}
                              >
                                <div className="flex items-center gap-3">
                                  {product.product_logo_url ? (
                                    <img
                                      src={product.product_logo_url}
                                      alt={product.product_name}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff] text-xs font-semibold text-[#0b1f5f]">
                                      {initials}
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold text-gray-900">
                                      {product.product_name}
                                    </div>
                                    <div className="truncate text-xs text-gray-500">
                                      {product.product_slogan_text ||
                                        "Add a product slogan"}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                  Service type
                                </div>
                                <div className="text-sm font-semibold text-[#0b1f5f]">
                                  {service?.display_name ??
                                    product.service_code ??
                                    "Not set"}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <div className="text-lg font-semibold text-[#0b1f5f]">
                                  Product details
                                </div>
                                <div className="text-sm text-gray-600">
                                  Use Save above to store changes.
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 grid gap-4">
                              <div className="grid gap-2">
                                <Label>Product name</Label>
                                <Input
                                  value={productDraft.product_name}
                                  onChange={(e) =>
                                    setProductDraft((prev) => ({
                                      ...prev,
                                      product_name: e.target.value,
                                    }))
                                  }
                                  placeholder="SAT Bootcamp"
                                />
                              </div>
                              <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                  <Label>Product slogan</Label>
                                  {(() => {
                                    const aiKey = "product:slogan";
                                    const isLoading = Boolean(
                                      aiRewriteLoading[aiKey],
                                    );
                                    const hasPending = Boolean(
                                      aiRewrites[aiKey],
                                    );
                                    return (
                                      <button
                                        type="button"
                                        className={[
                                          "text-xs font-semibold",
                                          isLoading || hasPending
                                            ? "cursor-default text-gray-400"
                                            : "cursor-pointer text-[#0b1f5f]",
                                        ].join(" ")}
                                        disabled={isLoading || hasPending}
                                        onClick={async () => {
                                          if (isLoading || hasPending) return;
                                          const previous =
                                            productDraft.product_slogan_text;
                                          setAiLoading(aiKey, true);
                                          try {
                                            const next = await rewriteWithAi(
                                              "Rewrite this product slogan for clarity and marketing appeal.",
                                              previous,
                                            );
                                            setProductDraft((prev) => ({
                                              ...prev,
                                              product_slogan_text: next,
                                            }));
                                            setAiRewrite(aiKey, previous, next);
                                          } finally {
                                            setAiLoading(aiKey, false);
                                          }
                                        }}
                                      >
                                        {isLoading
                                          ? "Thinking..."
                                          : hasPending
                                            ? "Accept?"
                                            : "Rewrite with AI"}
                                      </button>
                                    );
                                  })()}
                                </div>
                                <Input
                                  value={productDraft.product_slogan_text}
                                  onChange={(e) =>
                                    setProductDraft((prev) => ({
                                      ...prev,
                                      product_slogan_text: e.target.value,
                                    }))
                                  }
                                  placeholder="Help students ace the SAT with confidence."
                                />
                                {aiRewrites["product:slogan"] ? (
                                  <div className="flex items-center gap-3 text-xs">
                                    <button
                                      type="button"
                                      className="flex items-center gap-1 font-semibold text-green-600 hover:text-green-700"
                                      onClick={() =>
                                        clearAiRewrite("product:slogan")
                                      }
                                    >
                                      <HugeiconsIcon
                                        icon={CheckmarkCircle01Icon}
                                        size={14}
                                        className="text-green-600"
                                      />
                                      Accept
                                    </button>
                                    <button
                                      type="button"
                                      className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700"
                                      onClick={() => {
                                        const previous =
                                          aiRewrites["product:slogan"]
                                            ?.previous ?? "";
                                        setProductDraft((prev) => ({
                                          ...prev,
                                          product_slogan_text: previous,
                                        }));
                                        clearAiRewrite("product:slogan");
                                      }}
                                    >
                                      <HugeiconsIcon
                                        icon={Cancel01Icon}
                                        size={14}
                                        className="text-red-600"
                                      />
                                      Reject
                                    </button>
                                  </div>
                                ) : null}
                              </div>
                              <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                  <Label>Product description</Label>
                                  {(() => {
                                    const aiKey = "product:description";
                                    const isLoading = Boolean(
                                      aiRewriteLoading[aiKey],
                                    );
                                    const hasPending = Boolean(
                                      aiRewrites[aiKey],
                                    );
                                    return (
                                      <button
                                        type="button"
                                        className={[
                                          "text-xs font-semibold",
                                          isLoading || hasPending
                                            ? "cursor-default text-gray-400"
                                            : "cursor-pointer text-[#0b1f5f]",
                                        ].join(" ")}
                                        disabled={isLoading || hasPending}
                                        onClick={async () => {
                                          if (isLoading || hasPending) return;
                                          const previous =
                                            productDraft.product_description_text;
                                          setAiLoading(aiKey, true);
                                          try {
                                            const next = await rewriteWithAi(
                                              "Rewrite this product description for a polished marketing tone.",
                                              previous,
                                            );
                                            setProductDraft((prev) => ({
                                              ...prev,
                                              product_description_text: next,
                                            }));
                                            setAiRewrite(aiKey, previous, next);
                                          } finally {
                                            setAiLoading(aiKey, false);
                                          }
                                        }}
                                      >
                                        {isLoading
                                          ? "Thinking..."
                                          : hasPending
                                            ? "Accept?"
                                            : "Rewrite with AI"}
                                      </button>
                                    );
                                  })()}
                                </div>
                                <Textarea
                                  value={productDraft.product_description_text}
                                  onChange={(e) =>
                                    setProductDraft((prev) => ({
                                      ...prev,
                                      product_description_text: e.target.value,
                                    }))
                                  }
                                  rows={5}
                                  placeholder="Describe the outcomes, format, and who this product serves."
                                />
                                {aiRewrites["product:description"] ? (
                                  <div className="flex items-center gap-3 text-xs">
                                    <button
                                      type="button"
                                      className="flex items-center gap-1 font-semibold text-green-600 hover:text-green-700"
                                      onClick={() =>
                                        clearAiRewrite("product:description")
                                      }
                                    >
                                      <HugeiconsIcon
                                        icon={CheckmarkCircle01Icon}
                                        size={14}
                                        className="text-green-600"
                                      />
                                      Accept
                                    </button>
                                    <button
                                      type="button"
                                      className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700"
                                      onClick={() => {
                                        const previous =
                                          aiRewrites["product:description"]
                                            ?.previous ?? "";
                                        setProductDraft((prev) => ({
                                          ...prev,
                                          product_description_text: previous,
                                        }));
                                        clearAiRewrite("product:description");
                                      }}
                                    >
                                      <HugeiconsIcon
                                        icon={Cancel01Icon}
                                        size={14}
                                        className="text-red-600"
                                      />
                                      Reject
                                    </button>
                                  </div>
                                ) : null}
                              </div>
                              <div className="grid gap-2">
                                <Label>Service type</Label>
                                <select
                                  className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                  value={productDraft.service_code}
                                  onChange={(e) =>
                                    setProductDraft((prev) => ({
                                      ...prev,
                                      service_code: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">
                                    Select a service type
                                  </option>
                                  {marketingServices.map((svc) => (
                                    <option
                                      key={svc.service_code}
                                      value={svc.service_code}
                                    >
                                      {svc.display_name ?? svc.service_code}
                                    </option>
                                  ))}
                                </select>
                                <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
                                  <div>
                                    Unit length:{" "}
                                    {selectedProductService?.unit_length_minutes
                                      ? `${selectedProductService.unit_length_minutes} minutes`
                                      : "--"}
                                  </div>
                                  <div>
                                    Unit price:{" "}
                                    {selectedProductService
                                      ? formatCurrencyFromCents(
                                          selectedProductService.hourly_rate_cents,
                                        )
                                      : "--"}
                                  </div>
                                </div>
                              </div>
                              <div className="grid gap-4">
                                <div className="grid gap-2">
                                  <Label>Subject (optional)</Label>
                                  <select
                                    className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                    value={productDraft.subject_id}
                                    onChange={(e) =>
                                      setProductDraft((prev) => ({
                                        ...prev,
                                        subject_id: e.target.value,
                                        topic_id: "",
                                      }))
                                    }
                                  >
                                    <option value="">Select a subject</option>
                                    {subjects
                                      .filter((subject) => !subject.archived_at)
                                      .map((subject) => (
                                        <option
                                          key={subject.id}
                                          value={subject.id}
                                        >
                                          {subject.subject_name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="grid gap-2">
                                  <Label>Topic (optional)</Label>
                                  <select
                                    className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                    value={productDraft.topic_id}
                                    onChange={(e) =>
                                      setProductDraft((prev) => ({
                                        ...prev,
                                        topic_id: e.target.value,
                                      }))
                                    }
                                    disabled={!productDraft.subject_id}
                                  >
                                    <option value="">Select a topic</option>
                                    {productTopicOptions.map((topic) => (
                                      <option key={topic.id} value={topic.id}>
                                        {topic.topic_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label>Product logo</Label>
                                <div className="flex flex-wrap items-center gap-3">
                                  <Input
                                    value={productDraft.product_logo_url}
                                    onChange={(e) =>
                                      setProductDraft((prev) => ({
                                        ...prev,
                                        product_logo_url: e.target.value,
                                      }))
                                    }
                                    placeholder="Paste logo URL or upload below"
                                  />
                                  <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                    Upload logo
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const dataUrl =
                                          await readFileAsDataUrl(file);
                                        setProductDraft((prev) => ({
                                          ...prev,
                                          product_logo_url: dataUrl,
                                        }));
                                      }}
                                    />
                                  </label>
                                </div>
                                {productDraft.product_logo_url ? (
                                  <img
                                    src={productDraft.product_logo_url}
                                    alt="Product logo"
                                    className="h-16 w-16 rounded-xl border border-gray-200 object-cover"
                                  />
                                ) : (
                                  <div className="text-xs text-gray-500">
                                    No logo uploaded yet.
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="mt-6 border-t border-gray-200 pt-4">
                              <div className="text-lg font-semibold text-[#0b1f5f]">
                                Product media
                                {productDraft.product_name
                                  ? ` for ${productDraft.product_name}`
                                  : ""}
                              </div>
                              <div className="text-sm text-gray-600">
                                Upload photos and videos specific to this
                                product so it&apos;s clear what you&apos;re
                                sharing.
                              </div>
                              <div className="mt-4 grid gap-3">
                                {productDraft.id ? (
                                  <>
                                    {productMediaLoading ? (
                                      <div className="text-sm text-gray-500">
                                        Loading media...
                                      </div>
                                    ) : null}
                                    {productMedia.length === 0 &&
                                    !productMediaLoading ? (
                                      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                                        No media yet. Upload photos or videos
                                        for this product.
                                      </div>
                                    ) : null}
                                    {productMedia.length ? (
                                      <div className="grid gap-3 sm:grid-cols-2">
                                        {productMedia.map((media) => (
                                          <div
                                            key={media.id}
                                            className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
                                          >
                                            {media.media_type === "VIDEO" ? (
                                              <video
                                                src={media.media_url}
                                                controls
                                                className="h-40 w-full object-cover"
                                              />
                                            ) : (
                                              <img
                                                src={media.media_url}
                                                alt=""
                                                className="h-40 w-full object-cover"
                                              />
                                            )}
                                            <button
                                              type="button"
                                              className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-gray-700"
                                              onClick={() =>
                                                removeCatalogMedia(
                                                  media.id,
                                                  () =>
                                                    loadCatalogMedia({
                                                      kind: "product",
                                                      id: productDraft.id!,
                                                      product_id:
                                                        productDraft.id!,
                                                    }),
                                                )
                                              }
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    ) : null}
                                    <div className="flex flex-wrap gap-2">
                                      <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                        Upload photo
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          multiple
                                          onChange={(e) => {
                                            const files = Array.from(
                                              e.target.files ?? [],
                                            );
                                            files.forEach((file) =>
                                              handleMediaFileUpload({
                                                kind: "product",
                                                id: productDraft.id!,
                                                file,
                                                media_type: "PHOTO",
                                                product_id: productDraft.id!,
                                              }),
                                            );
                                          }}
                                        />
                                      </label>
                                      <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                        Upload video
                                        <input
                                          type="file"
                                          accept="video/*"
                                          className="hidden"
                                          multiple
                                          onChange={(e) => {
                                            const files = Array.from(
                                              e.target.files ?? [],
                                            );
                                            files.forEach((file) =>
                                              handleMediaFileUpload({
                                                kind: "product",
                                                id: productDraft.id!,
                                                file,
                                                media_type: "VIDEO",
                                                product_id: productDraft.id!,
                                              }),
                                            );
                                          }}
                                        />
                                      </label>
                                    </div>
                                  </>
                                ) : (
                                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                                    Save the product first to upload media.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {activeTab === "PRODUCTS" && marketingTab === "SERVICES" ? (
                      <div className="grid gap-6">
                        <div className="text-sm text-gray-600">
                          Add marketing descriptions and media for each active
                          service type.
                        </div>
                        {marketingServices.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                            No active services yet. Enable services in the
                            Services tab first.
                          </div>
                        ) : (
                          <div className="grid gap-4">
                            {marketingServices.map((svc) => {
                              const mediaKey = catalogMediaKey(
                                "service",
                                svc.service_code,
                              );
                              const media = catalogMediaByKey[mediaKey] ?? [];
                              const loadingMedia = Boolean(
                                catalogMediaLoading[mediaKey],
                              );
                              const aiKey = `service:${svc.service_code}`;
                              return (
                                <div
                                  key={svc.service_code}
                                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                >
                                  <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                      <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        Service
                                      </div>
                                      <div className="text-lg font-semibold text-[#0b1f5f]">
                                        {svc.display_name ?? svc.service_code}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        Unit length{" "}
                                        {svc.unit_length_minutes ?? 60} min -
                                        Unit price{" "}
                                        {formatCurrencyFromCents(
                                          svc.hourly_rate_cents,
                                        )}
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      className="itutoros-settings-btn itutoros-settings-btn-primary"
                                      onClick={() =>
                                        saveServiceDescription(svc.service_code)
                                      }
                                    >
                                      Save
                                    </button>
                                  </div>
                                  <div className="mt-4 grid gap-2">
                                    <div className="flex items-center justify-between">
                                      <Label>Description</Label>
                                      {(() => {
                                        const isLoading = Boolean(
                                          aiRewriteLoading[aiKey],
                                        );
                                        const hasPending = Boolean(
                                          aiRewrites[aiKey],
                                        );
                                        return (
                                          <button
                                            type="button"
                                            className={[
                                              "text-xs font-semibold",
                                              isLoading || hasPending
                                                ? "cursor-default text-gray-400"
                                                : "cursor-pointer text-[#0b1f5f]",
                                            ].join(" ")}
                                            disabled={isLoading || hasPending}
                                            onClick={async () => {
                                              if (isLoading || hasPending)
                                                return;
                                              const current =
                                                serviceDescriptionDrafts[
                                                  svc.service_code
                                                ] ?? "";
                                              setAiLoading(aiKey, true);
                                              try {
                                                const next =
                                                  await rewriteWithAi(
                                                    `Rewrite the marketing description for ${svc.display_name ?? svc.service_code}.`,
                                                    current,
                                                  );
                                                setServiceDescriptionDrafts(
                                                  (prev) => ({
                                                    ...prev,
                                                    [svc.service_code]: next,
                                                  }),
                                                );
                                                setAiRewrite(
                                                  aiKey,
                                                  current,
                                                  next,
                                                );
                                              } finally {
                                                setAiLoading(aiKey, false);
                                              }
                                            }}
                                          >
                                            {isLoading
                                              ? "Thinking..."
                                              : hasPending
                                                ? "Accept?"
                                                : "Rewrite with AI"}
                                          </button>
                                        );
                                      })()}
                                    </div>
                                    <Textarea
                                      rows={4}
                                      value={
                                        serviceDescriptionDrafts[
                                          svc.service_code
                                        ] ?? ""
                                      }
                                      onChange={(e) =>
                                        setServiceDescriptionDrafts((prev) => ({
                                          ...prev,
                                          [svc.service_code]: e.target.value,
                                        }))
                                      }
                                      placeholder="Describe what makes this service special."
                                    />
                                    {aiRewrites[aiKey] ? (
                                      <div className="flex items-center gap-3 text-xs">
                                        <button
                                          type="button"
                                          className="flex items-center gap-1 font-semibold text-green-600 hover:text-green-700"
                                          onClick={() => clearAiRewrite(aiKey)}
                                        >
                                          <HugeiconsIcon
                                            icon={CheckmarkCircle01Icon}
                                            size={14}
                                            className="text-green-600"
                                          />
                                          Accept
                                        </button>
                                        <button
                                          type="button"
                                          className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700"
                                          onClick={() => {
                                            const previous =
                                              aiRewrites[aiKey]?.previous ?? "";
                                            setServiceDescriptionDrafts(
                                              (prev) => ({
                                                ...prev,
                                                [svc.service_code]: previous,
                                              }),
                                            );
                                            clearAiRewrite(aiKey);
                                          }}
                                        >
                                          <HugeiconsIcon
                                            icon={Cancel01Icon}
                                            size={14}
                                            className="text-red-600"
                                          />
                                          Reject
                                        </button>
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="mt-4 grid gap-2">
                                    <Label>Service branding/logo</Label>
                                    <div className="flex flex-wrap items-center gap-3">
                                      <Input
                                        value={
                                          serviceLogoDrafts[svc.service_code] ??
                                          ""
                                        }
                                        onChange={(e) =>
                                          setServiceLogoDrafts((prev) => ({
                                            ...prev,
                                            [svc.service_code]: e.target.value,
                                          }))
                                        }
                                        placeholder="Paste logo URL or upload below"
                                      />
                                      <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                        Upload logo
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const dataUrl =
                                              await readFileAsDataUrl(file);
                                            setServiceLogoDrafts((prev) => ({
                                              ...prev,
                                              [svc.service_code]: dataUrl,
                                            }));
                                          }}
                                        />
                                      </label>
                                    </div>
                                    {serviceLogoDrafts[svc.service_code] ? (
                                      <img
                                        src={
                                          serviceLogoDrafts[svc.service_code]
                                        }
                                        alt={`${svc.display_name ?? svc.service_code} logo`}
                                        className="h-16 w-16 rounded-xl border border-gray-200 object-cover"
                                      />
                                    ) : (
                                      <div className="text-xs text-gray-500">
                                        No service logo uploaded yet.
                                      </div>
                                    )}
                                  </div>
                                  <div className="mt-4 grid gap-3">
                                    <div className="text-sm font-semibold text-gray-700">
                                      Media gallery
                                    </div>
                                    {loadingMedia ? (
                                      <div className="text-sm text-gray-500">
                                        Loading media...
                                      </div>
                                    ) : null}
                                    {media.length === 0 && !loadingMedia ? (
                                      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                                        Add photos or videos to showcase this
                                        service.
                                      </div>
                                    ) : null}
                                    {media.length ? (
                                      <div className="grid gap-3 sm:grid-cols-2">
                                        {media.map((item) => (
                                          <div
                                            key={item.id}
                                            className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
                                          >
                                            {item.media_type === "VIDEO" ? (
                                              <video
                                                src={item.media_url}
                                                controls
                                                className="h-36 w-full object-cover"
                                              />
                                            ) : (
                                              <img
                                                src={item.media_url}
                                                alt=""
                                                className="h-36 w-full object-cover"
                                              />
                                            )}
                                            <button
                                              type="button"
                                              className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-gray-700"
                                              onClick={() =>
                                                removeCatalogMedia(
                                                  item.id,
                                                  () =>
                                                    loadCatalogMedia({
                                                      kind: "service",
                                                      id: svc.service_code,
                                                      service_code:
                                                        svc.service_code,
                                                    }),
                                                )
                                              }
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    ) : null}
                                    <div className="flex flex-wrap gap-2">
                                      <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                        Upload photo
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          multiple
                                          onChange={(e) => {
                                            const files = Array.from(
                                              e.target.files ?? [],
                                            );
                                            files.forEach((file) =>
                                              handleMediaFileUpload({
                                                kind: "service",
                                                id: svc.service_code,
                                                file,
                                                media_type: "PHOTO",
                                                service_code: svc.service_code,
                                              }),
                                            );
                                          }}
                                        />
                                      </label>
                                      <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                        Upload video
                                        <input
                                          type="file"
                                          accept="video/*"
                                          className="hidden"
                                          multiple
                                          onChange={(e) => {
                                            const files = Array.from(
                                              e.target.files ?? [],
                                            );
                                            files.forEach((file) =>
                                              handleMediaFileUpload({
                                                kind: "service",
                                                id: svc.service_code,
                                                file,
                                                media_type: "VIDEO",
                                                service_code: svc.service_code,
                                              }),
                                            );
                                          }}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : null}
                    {activeTab === "PRODUCTS" && marketingTab === "SUBJECTS" ? (
                      <div className="grid gap-6">
                        <div className="text-sm text-gray-600">
                          Add marketing descriptions and media for your active
                          subjects.
                        </div>
                        {subjects.filter((s) => !s.archived_at).length === 0 ? (
                          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                            No active subjects yet. Enable subjects first.
                          </div>
                        ) : (
                          <div className="grid gap-4">
                            {subjects
                              .filter((subject) => !subject.archived_at)
                              .map((subject) => {
                                const mediaKey = catalogMediaKey(
                                  "subject",
                                  subject.id,
                                );
                                const media = catalogMediaByKey[mediaKey] ?? [];
                                const loadingMedia = Boolean(
                                  catalogMediaLoading[mediaKey],
                                );
                                const aiKey = `subject:${subject.id}`;
                                return (
                                  <div
                                    key={subject.id}
                                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                  >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                      <div>
                                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                          Subject
                                        </div>
                                        <div className="text-lg font-semibold text-[#0b1f5f]">
                                          {subject.subject_name}
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        className="itutoros-settings-btn itutoros-settings-btn-primary"
                                        onClick={() =>
                                          saveSubjectDescription(subject.id)
                                        }
                                      >
                                        Save
                                      </button>
                                    </div>
                                    <div className="mt-4 grid gap-2">
                                      <div className="flex items-center justify-between">
                                        <Label>Description</Label>
                                        {(() => {
                                          const isLoading = Boolean(
                                            aiRewriteLoading[aiKey],
                                          );
                                          const hasPending = Boolean(
                                            aiRewrites[aiKey],
                                          );
                                          return (
                                            <button
                                              type="button"
                                              className={[
                                                "text-xs font-semibold",
                                                isLoading || hasPending
                                                  ? "cursor-default text-gray-400"
                                                  : "cursor-pointer text-[#0b1f5f]",
                                              ].join(" ")}
                                              disabled={isLoading || hasPending}
                                              onClick={async () => {
                                                if (isLoading || hasPending)
                                                  return;
                                                const current =
                                                  subjectDescriptionDrafts[
                                                    subject.id
                                                  ] ?? "";
                                                setAiLoading(aiKey, true);
                                                try {
                                                  const next =
                                                    await rewriteWithAi(
                                                      `Rewrite the marketing description for ${subject.subject_name}.`,
                                                      current,
                                                    );
                                                  setSubjectDescriptionDrafts(
                                                    (prev) => ({
                                                      ...prev,
                                                      [subject.id]: next,
                                                    }),
                                                  );
                                                  setAiRewrite(
                                                    aiKey,
                                                    current,
                                                    next,
                                                  );
                                                } finally {
                                                  setAiLoading(aiKey, false);
                                                }
                                              }}
                                            >
                                              {isLoading
                                                ? "Thinking..."
                                                : hasPending
                                                  ? "Accept?"
                                                  : "Rewrite with AI"}
                                            </button>
                                          );
                                        })()}
                                      </div>
                                      <Textarea
                                        rows={4}
                                        value={
                                          subjectDescriptionDrafts[
                                            subject.id
                                          ] ?? ""
                                        }
                                        onChange={(e) =>
                                          setSubjectDescriptionDrafts(
                                            (prev) => ({
                                              ...prev,
                                              [subject.id]: e.target.value,
                                            }),
                                          )
                                        }
                                        placeholder="Share the outcomes and focus areas for this subject."
                                      />
                                      {aiRewrites[aiKey] ? (
                                        <div className="flex items-center gap-3 text-xs">
                                          <button
                                            type="button"
                                            className="flex items-center gap-1 font-semibold text-green-600 hover:text-green-700"
                                            onClick={() =>
                                              clearAiRewrite(aiKey)
                                            }
                                          >
                                            <HugeiconsIcon
                                              icon={CheckmarkCircle01Icon}
                                              size={14}
                                              className="text-green-600"
                                            />
                                            Accept
                                          </button>
                                          <button
                                            type="button"
                                            className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700"
                                            onClick={() => {
                                              const previous =
                                                aiRewrites[aiKey]?.previous ??
                                                "";
                                              setSubjectDescriptionDrafts(
                                                (prev) => ({
                                                  ...prev,
                                                  [subject.id]: previous,
                                                }),
                                              );
                                              clearAiRewrite(aiKey);
                                            }}
                                          >
                                            <HugeiconsIcon
                                              icon={Cancel01Icon}
                                              size={14}
                                              className="text-red-600"
                                            />
                                            Reject
                                          </button>
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="mt-4 grid gap-3">
                                      <div className="text-sm font-semibold text-gray-700">
                                        Media gallery
                                      </div>
                                      {loadingMedia ? (
                                        <div className="text-sm text-gray-500">
                                          Loading media...
                                        </div>
                                      ) : null}
                                      {media.length === 0 && !loadingMedia ? (
                                        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                                          Add photos or videos to highlight this
                                          subject.
                                        </div>
                                      ) : null}
                                      {media.length ? (
                                        <div className="grid gap-3 sm:grid-cols-2">
                                          {media.map((item) => (
                                            <div
                                              key={item.id}
                                              className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
                                            >
                                              {item.media_type === "VIDEO" ? (
                                                <video
                                                  src={item.media_url}
                                                  controls
                                                  className="h-36 w-full object-cover"
                                                />
                                              ) : (
                                                <img
                                                  src={item.media_url}
                                                  alt=""
                                                  className="h-36 w-full object-cover"
                                                />
                                              )}
                                              <button
                                                type="button"
                                                className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-gray-700"
                                                onClick={() =>
                                                  removeCatalogMedia(
                                                    item.id,
                                                    () =>
                                                      loadCatalogMedia({
                                                        kind: "subject",
                                                        id: subject.id,
                                                        subject_id: subject.id,
                                                      }),
                                                  )
                                                }
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      ) : null}
                                      <div className="flex flex-wrap gap-2">
                                        <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                          Upload photo
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            multiple
                                            onChange={(e) => {
                                              const files = Array.from(
                                                e.target.files ?? [],
                                              );
                                              files.forEach((file) =>
                                                handleMediaFileUpload({
                                                  kind: "subject",
                                                  id: subject.id,
                                                  file,
                                                  media_type: "PHOTO",
                                                  subject_id: subject.id,
                                                }),
                                              );
                                            }}
                                          />
                                        </label>
                                        <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                          Upload video
                                          <input
                                            type="file"
                                            accept="video/*"
                                            className="hidden"
                                            multiple
                                            onChange={(e) => {
                                              const files = Array.from(
                                                e.target.files ?? [],
                                              );
                                              files.forEach((file) =>
                                                handleMediaFileUpload({
                                                  kind: "subject",
                                                  id: subject.id,
                                                  file,
                                                  media_type: "VIDEO",
                                                  subject_id: subject.id,
                                                }),
                                              );
                                            }}
                                          />
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    ) : null}
                    {activeTab === "PRODUCTS" && marketingTab === "TOPICS" ? (
                      <div className="grid gap-6">
                        <div className="text-sm text-gray-600">
                          Add marketing descriptions for the topics within a
                          subject.
                        </div>
                        <div className="grid gap-2">
                          <Label>Subject</Label>
                          <select
                            className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                            value={marketingSubjectId}
                            onChange={(e) =>
                              setMarketingSubjectId(e.target.value)
                            }
                          >
                            <option value="">Select a subject</option>
                            {subjects
                              .filter((subject) => !subject.archived_at)
                              .map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                  {subject.subject_name}
                                </option>
                              ))}
                          </select>
                        </div>
                        {!marketingSubjectId ? (
                          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                            Choose a subject to see its topics.
                          </div>
                        ) : null}
                        {marketingSubjectId ? (
                          <div className="grid gap-4">
                            {(topicsBySubject[marketingSubjectId] ?? [])
                              .filter((topic) => !topic.archived_at)
                              .map((topic) => {
                                const mediaKey = catalogMediaKey(
                                  "topic",
                                  topic.id,
                                );
                                const media = catalogMediaByKey[mediaKey] ?? [];
                                const loadingMedia = Boolean(
                                  catalogMediaLoading[mediaKey],
                                );
                                const aiKey = `topic:${topic.id}`;
                                return (
                                  <div
                                    key={topic.id}
                                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                  >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                      <div>
                                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                          Topic
                                        </div>
                                        <div className="text-lg font-semibold text-[#0b1f5f]">
                                          {topic.topic_name}
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        className="itutoros-settings-btn itutoros-settings-btn-primary"
                                        onClick={() =>
                                          saveTopicDescription(topic.id)
                                        }
                                      >
                                        Save
                                      </button>
                                    </div>
                                    <div className="mt-4 grid gap-2">
                                      <div className="flex items-center justify-between">
                                        <Label>Description</Label>
                                        {(() => {
                                          const isLoading = Boolean(
                                            aiRewriteLoading[aiKey],
                                          );
                                          const hasPending = Boolean(
                                            aiRewrites[aiKey],
                                          );
                                          return (
                                            <button
                                              type="button"
                                              className={[
                                                "text-xs font-semibold",
                                                isLoading || hasPending
                                                  ? "cursor-default text-gray-400"
                                                  : "cursor-pointer text-[#0b1f5f]",
                                              ].join(" ")}
                                              disabled={isLoading || hasPending}
                                              onClick={async () => {
                                                if (isLoading || hasPending)
                                                  return;
                                                const current =
                                                  topicDescriptionDrafts[
                                                    topic.id
                                                  ] ?? "";
                                                setAiLoading(aiKey, true);
                                                try {
                                                  const next =
                                                    await rewriteWithAi(
                                                      `Rewrite the marketing description for ${topic.topic_name}.`,
                                                      current,
                                                    );
                                                  setTopicDescriptionDrafts(
                                                    (prev) => ({
                                                      ...prev,
                                                      [topic.id]: next,
                                                    }),
                                                  );
                                                  setAiRewrite(
                                                    aiKey,
                                                    current,
                                                    next,
                                                  );
                                                } finally {
                                                  setAiLoading(aiKey, false);
                                                }
                                              }}
                                            >
                                              {isLoading
                                                ? "Thinking..."
                                                : hasPending
                                                  ? "Accept?"
                                                  : "Rewrite with AI"}
                                            </button>
                                          );
                                        })()}
                                      </div>
                                      <Textarea
                                        rows={3}
                                        value={
                                          topicDescriptionDrafts[topic.id] ?? ""
                                        }
                                        onChange={(e) =>
                                          setTopicDescriptionDrafts((prev) => ({
                                            ...prev,
                                            [topic.id]: e.target.value,
                                          }))
                                        }
                                        placeholder="Describe the focus and outcomes for this topic."
                                      />
                                      {aiRewrites[aiKey] ? (
                                        <div className="flex items-center gap-3 text-xs">
                                          <button
                                            type="button"
                                            className="flex items-center gap-1 font-semibold text-green-600 hover:text-green-700"
                                            onClick={() =>
                                              clearAiRewrite(aiKey)
                                            }
                                          >
                                            <HugeiconsIcon
                                              icon={CheckmarkCircle01Icon}
                                              size={14}
                                              className="text-green-600"
                                            />
                                            Accept
                                          </button>
                                          <button
                                            type="button"
                                            className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700"
                                            onClick={() => {
                                              const previous =
                                                aiRewrites[aiKey]?.previous ??
                                                "";
                                              setTopicDescriptionDrafts(
                                                (prev) => ({
                                                  ...prev,
                                                  [topic.id]: previous,
                                                }),
                                              );
                                              clearAiRewrite(aiKey);
                                            }}
                                          >
                                            <HugeiconsIcon
                                              icon={Cancel01Icon}
                                              size={14}
                                              className="text-red-600"
                                            />
                                            Reject
                                          </button>
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="mt-4 grid gap-3">
                                      <div className="text-sm font-semibold text-gray-700">
                                        Media gallery
                                      </div>
                                      {loadingMedia ? (
                                        <div className="text-sm text-gray-500">
                                          Loading media...
                                        </div>
                                      ) : null}
                                      {media.length === 0 && !loadingMedia ? (
                                        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                                          Add optional visuals for this topic.
                                        </div>
                                      ) : null}
                                      {media.length ? (
                                        <div className="grid gap-3 sm:grid-cols-2">
                                          {media.map((item) => (
                                            <div
                                              key={item.id}
                                              className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
                                            >
                                              {item.media_type === "VIDEO" ? (
                                                <video
                                                  src={item.media_url}
                                                  controls
                                                  className="h-32 w-full object-cover"
                                                />
                                              ) : (
                                                <img
                                                  src={item.media_url}
                                                  alt=""
                                                  className="h-32 w-full object-cover"
                                                />
                                              )}
                                              <button
                                                type="button"
                                                className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-gray-700"
                                                onClick={() =>
                                                  removeCatalogMedia(
                                                    item.id,
                                                    () =>
                                                      loadCatalogMedia({
                                                        kind: "topic",
                                                        id: topic.id,
                                                        topic_id: topic.id,
                                                      }),
                                                  )
                                                }
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      ) : null}
                                      <div className="flex flex-wrap gap-2">
                                        <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                          Upload photo
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            multiple
                                            onChange={(e) => {
                                              const files = Array.from(
                                                e.target.files ?? [],
                                              );
                                              files.forEach((file) =>
                                                handleMediaFileUpload({
                                                  kind: "topic",
                                                  id: topic.id,
                                                  file,
                                                  media_type: "PHOTO",
                                                  topic_id: topic.id,
                                                }),
                                              );
                                            }}
                                          />
                                        </label>
                                        <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                          Upload video
                                          <input
                                            type="file"
                                            accept="video/*"
                                            className="hidden"
                                            multiple
                                            onChange={(e) => {
                                              const files = Array.from(
                                                e.target.files ?? [],
                                              );
                                              files.forEach((file) =>
                                                handleMediaFileUpload({
                                                  kind: "topic",
                                                  id: topic.id,
                                                  file,
                                                  media_type: "VIDEO",
                                                  topic_id: topic.id,
                                                }),
                                              );
                                            }}
                                          />
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {activeTab === "PRODUCTS" && marketingTab === "COMPANY" ? (
                      <div className="grid gap-6">
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                          <div className="text-lg font-semibold text-[#0b1f5f]">
                            Company content
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            This content is reused by Marketing post generation
                            and Website development.
                          </div>
                          <div className="mt-4 grid gap-4">
                            <div className="grid gap-2">
                              <Label>Company logo</Label>
                              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                                {companyDraft.company_logo_url ? (
                                  <div className="flex min-h-[120px] items-center justify-center overflow-hidden rounded-lg bg-white p-2">
                                    <img
                                      src={companyDraft.company_logo_url}
                                      alt="Company logo"
                                      className="max-h-[104px] w-auto max-w-full object-contain"
                                    />
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-500">
                                    No company logo uploaded yet.
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <label className="itutoros-settings-btn itutoros-settings-btn-primary cursor-pointer">
                                  Upload logo
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      try {
                                        const dataUrl =
                                          await readFileAsDataUrl(file);
                                        setCompanyDraft((prev) => ({
                                          ...prev,
                                          company_logo_url: dataUrl,
                                        }));
                                      } catch (err) {
                                        setStatus(
                                          err instanceof Error
                                            ? err.message
                                            : "Unable to read image file.",
                                        );
                                      } finally {
                                        e.currentTarget.value = "";
                                      }
                                    }}
                                  />
                                </label>
                                <button
                                  type="button"
                                  className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                  onClick={() =>
                                    setCompanyDraft((prev) => ({
                                      ...prev,
                                      company_logo_url: "",
                                    }))
                                  }
                                  disabled={!companyDraft.company_logo_url}
                                >
                                  Remove logo
                                </button>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label>Company description</Label>
                              <Textarea
                                rows={4}
                                value={companyDraft.company_description_text}
                                onChange={(e) =>
                                  setCompanyDraft((prev) => ({
                                    ...prev,
                                    company_description_text: e.target.value,
                                  }))
                                }
                                placeholder="Describe your tutoring business and who you serve."
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>Mission statement</Label>
                              <Textarea
                                rows={3}
                                value={companyDraft.mission_text}
                                onChange={(e) =>
                                  setCompanyDraft((prev) => ({
                                    ...prev,
                                    mission_text: e.target.value,
                                  }))
                                }
                                placeholder="Share your mission and educational purpose."
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>Teaching style</Label>
                              <Textarea
                                rows={3}
                                value={companyDraft.tutoring_style_text}
                                onChange={(e) =>
                                  setCompanyDraft((prev) => ({
                                    ...prev,
                                    tutoring_style_text: e.target.value,
                                  }))
                                }
                                placeholder="Explain your instructional approach."
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>About us</Label>
                              <Textarea
                                rows={4}
                                value={companyDraft.about_us_text}
                                onChange={(e) =>
                                  setCompanyDraft((prev) => ({
                                    ...prev,
                                    about_us_text: e.target.value,
                                  }))
                                }
                                placeholder="Team background, values, and why families choose you."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {activeTab === "MARKETING" && (
                      <div className="grid gap-6">
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                          <div className="flex flex-wrap gap-2">
                            {MARKETING_SECTIONS.map((section) => (
                              <button
                                key={section.key}
                                type="button"
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                  marketingSection === section.key
                                    ? "bg-[#0b1f5f] text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                                onClick={() => setMarketingSection(section.key)}
                              >
                                {section.label}
                              </button>
                            ))}
                          </div>
                          <div className="mt-3 text-sm text-gray-600">
                            {marketingSection === "PLATFORMS"
                              ? "Choose where you market and track connection readiness."
                              : "Build AI-assisted social posts using content from Content Studio."}
                          </div>
                        </div>

                        <div
                          className={
                            marketingSection === "PLATFORMS" ? "" : "hidden"
                          }
                        >
                          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="text-base font-semibold text-[#0b1f5f]">
                              Platforms
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                              Choose the platforms you want to post to.
                              Connections enable direct posting later, but you
                              can still generate content now.
                            </div>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {CONNECTION_PROVIDERS.map((provider) => {
                                const connected =
                                  connectionStatusById[provider.id] ?? false;
                                const checked =
                                  socialDraft.platform_ids.includes(
                                    provider.id,
                                  );
                                return (
                                  <label
                                    key={provider.id}
                                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm ${
                                      connected
                                        ? "border-gray-200 bg-white"
                                        : "border-gray-200 bg-white/80"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#ff9df9]"
                                        checked={checked}
                                        onChange={() =>
                                          toggleSocialPlatform(provider.id)
                                        }
                                      />
                                      <div>
                                        <div className="font-semibold text-gray-800">
                                          {provider.label}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          {connected ? (
                                            "Connected"
                                          ) : (
                                            <>
                                              Not connected (manual posting
                                              only) go to{" "}
                                              <button
                                                type="button"
                                                className="cursor-pointer font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700"
                                                onClick={() =>
                                                  void switchTab("CONNECTIONS")
                                                }
                                              >
                                                Connections screen
                                              </button>{" "}
                                              to connect {provider.label}
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                            <div className="mt-4 grid gap-2">
                              {socialDraft.platform_ids.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3 text-xs text-gray-600">
                                  Select at least one connected platform to view
                                  platform specs.
                                </div>
                              ) : (
                                socialDraft.platform_ids.map((platformId) => {
                                  const spec =
                                    SOCIAL_PLATFORM_SPECS[platformId];
                                  const label =
                                    getConnectionProvider(platformId)?.label ??
                                    platformId;
                                  return (
                                    <div
                                      key={platformId}
                                      className="rounded-xl border border-gray-200 bg-white/80 p-3 text-xs text-gray-600"
                                    >
                                      <div className="font-semibold text-gray-700">
                                        {label}
                                      </div>
                                      <div>
                                        Suggested sizes:{" "}
                                        {spec.sizes.join(" | ")}
                                      </div>
                                      <div>
                                        Aspect ratios: {spec.ratios.join(" | ")}
                                      </div>
                                      <div>{spec.notes.join(" | ")}</div>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        </div>

                        <div
                          className={
                            marketingSection === "POST_BUILDER"
                              ? "grid gap-6"
                              : "hidden"
                          }
                        >
                          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="text-lg font-semibold text-[#0b1f5f]">
                              Social post builder
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                              Build AI-assisted social posts using your saved
                              products, subjects, topics, and uploaded media.
                            </div>
                          </div>

                          {socialFontPopupOpen ? (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                              <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
                                <div className="grid gap-2">
                                  <Label>Font</Label>
                                  <select
                                    className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                    value={socialFontFamily}
                                    onChange={(e) => setSocialFontFamily(e.target.value)}
                                  >
                                    {SOCIAL_FONT_OPTIONS.map((fontOption) => (
                                      <option key={fontOption} value={fontOption}>
                                        {fontOption}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="mt-3 flex justify-end">
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-primary !px-3 !py-1"
                                    onClick={() => setSocialFontPopupOpen(false)}
                                  >
                                    <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {socialImagePickerOpen ? (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                              <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                                <div className="grid gap-3">
                                  <div className="max-h-[340px] overflow-y-auto rounded-xl border border-gray-200 p-2">
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                                      {socialMediaCandidates.map((media) => (
                                        <button
                                          key={media.id}
                                          type="button"
                                          className={`relative aspect-square overflow-hidden rounded-lg border ${
                                            socialSelectedImageId === media.id
                                              ? "border-[#ff9df9] ring-2 ring-[#ff9df9]"
                                              : "border-gray-200"
                                          }`}
                                          onClick={() => setSocialSelectedImageId(media.id)}
                                        >
                                          {media.type === "VIDEO" ? (
                                            <video src={media.url} className="h-full w-full object-cover" />
                                          ) : (
                                            <img src={media.url} alt="" className="h-full w-full object-cover" />
                                          )}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <Input
                                      placeholder="Paste image URL"
                                      value={socialPreviewOverrideUrl}
                                      onChange={(e) => setSocialPreviewOverrideUrl(e.target.value)}
                                    />
                                    <label className="itutoros-settings-btn itutoros-settings-btn-secondary cursor-pointer">
                                      <HugeiconsIcon icon={Image01Icon} size={14} />
                                      <input
                                        type="file"
                                        accept="image/*,video/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (!file) return;
                                          void handleMediaFileUpload({
                                            kind: "product",
                                            id: GLOBAL_LIBRARY_ID,
                                            file,
                                            scope: "global",
                                          }).then(() =>
                                            void loadCatalogMedia({
                                              kind: "product",
                                              id: GLOBAL_LIBRARY_ID,
                                              scope: "global",
                                            }),
                                          );
                                        }}
                                      />
                                    </label>
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <button
                                      type="button"
                                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                      onClick={() => setSocialImagePickerOpen(false)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      className="itutoros-settings-btn itutoros-settings-btn-primary"
                                      onClick={socialApplySelectedImage}
                                      disabled={!socialSelectedImage && !socialPreviewOverrideUrl}
                                    >
                                      Insert
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="text-base font-semibold text-[#0b1f5f]">
                              Content sources
                            </div>
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                              <div className="grid gap-2">
                                <Label>Content Source Type</Label>
                                <select
                                  className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                  value={socialSourceType}
                                  onChange={(e) =>
                                    setSocialSourceTypeSelection(
                                      e.target.value as SocialSourceType,
                                    )
                                  }
                                >
                                  <option value="">Make a selection</option>
                                  <option value="PRODUCTS">Product</option>
                                  <option value="SERVICES">Service</option>
                                  <option value="SUBJECTS">Subject</option>
                                  <option value="TOPICS">Topic</option>
                                </select>
                              </div>
                              {socialSourceType ? (
                                <div className="grid gap-2">
                                  <Label>
                                    {socialSourceType === "PRODUCTS"
                                      ? "Products"
                                      : socialSourceType === "SERVICES"
                                        ? "Services"
                                        : socialSourceType === "SUBJECTS"
                                          ? "Subjects"
                                          : "Topics"}
                                  </Label>
                                  {socialSourceType === "PRODUCTS" ? (
                                    <select
                                      className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                      value={socialDraft.product_id}
                                      onChange={(e) =>
                                        setSocialDraft((prev) => ({
                                          ...prev,
                                          product_id: e.target.value,
                                          service_code: "",
                                          subject_id: "",
                                          topic_id: "",
                                          selected_media_ids: [],
                                        }))
                                      }
                                    >
                                      <option value="">Select a product</option>
                                      {products.map((product) => (
                                        <option
                                          key={product.id}
                                          value={product.id}
                                        >
                                          {product.product_name}
                                        </option>
                                      ))}
                                    </select>
                                  ) : null}
                                  {socialSourceType === "SERVICES" ? (
                                    <select
                                      className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                      value={socialDraft.service_code}
                                      onChange={(e) =>
                                        setSocialDraft((prev) => ({
                                          ...prev,
                                          product_id: "",
                                          service_code: e.target.value,
                                          subject_id: "",
                                          topic_id: "",
                                          selected_media_ids: [],
                                        }))
                                      }
                                    >
                                      <option value="">Select a service</option>
                                      {marketingServices.map((svc) => (
                                        <option
                                          key={svc.service_code}
                                          value={svc.service_code}
                                        >
                                          {svc.display_name ?? svc.service_code}
                                        </option>
                                      ))}
                                    </select>
                                  ) : null}
                                  {socialSourceType === "SUBJECTS" ? (
                                    <select
                                      className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                      value={socialDraft.subject_id}
                                      onChange={(e) =>
                                        setSocialDraft((prev) => ({
                                          ...prev,
                                          product_id: "",
                                          service_code: "",
                                          subject_id: e.target.value,
                                          topic_id: "",
                                          selected_media_ids: [],
                                        }))
                                      }
                                    >
                                      <option value="">Select a subject</option>
                                      {subjects
                                        .filter(
                                          (subject) => !subject.archived_at,
                                        )
                                        .map((subject) => (
                                          <option
                                            key={subject.id}
                                            value={subject.id}
                                          >
                                            {subject.subject_name}
                                          </option>
                                        ))}
                                    </select>
                                  ) : null}
                                  {socialSourceType === "TOPICS" ? (
                                    <select
                                      className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                      value={socialDraft.topic_id}
                                      onChange={(e) =>
                                        setSocialDraft((prev) => ({
                                          ...prev,
                                          product_id: "",
                                          service_code: "",
                                          subject_id: "",
                                          topic_id: e.target.value,
                                          selected_media_ids: [],
                                        }))
                                      }
                                    >
                                      <option value="">Select a topic</option>
                                      {socialTopicOptions.map((topic) => (
                                        <option key={topic.id} value={topic.id}>
                                          {topic.topic_name}
                                        </option>
                                      ))}
                                    </select>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="text-base font-semibold text-[#0b1f5f]">
                              Offer details
                            </div>
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                              <div className="grid gap-2 md:col-span-2">
                                <Label>Headline</Label>
                                <Input
                                  value={socialDraft.headline}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      headline: e.target.value,
                                    }))
                                  }
                                  placeholder="Registration is open!"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>Start date</Label>
                                <Input
                                  type="date"
                                  value={socialDraft.start_date}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      start_date: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>End date</Label>
                                <Input
                                  type="date"
                                  value={socialDraft.end_date}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      end_date: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>Age range</Label>
                                <Input
                                  value={socialDraft.age_range}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      age_range: e.target.value,
                                    }))
                                  }
                                  placeholder="Grades 3-5, ages 8-10"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>Price / offer</Label>
                                <Input
                                  value={socialDraft.price_detail}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      price_detail: e.target.value,
                                    }))
                                  }
                                  placeholder="$200 for 4 sessions"
                                />
                              </div>
                              <div className="grid gap-2 md:col-span-2">
                                <Label>Location / format</Label>
                                <Input
                                  value={socialDraft.location_detail}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      location_detail: e.target.value,
                                    }))
                                  }
                                  placeholder="Irvington campus or virtual"
                                />
                              </div>
                              <div className="grid gap-2 md:col-span-2">
                                <Label>Enrollment link</Label>
                                <Input
                                  value={socialDraft.enrollment_link}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      enrollment_link: e.target.value,
                                    }))
                                  }
                                  placeholder="https://..."
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>Call to action</Label>
                                <Input
                                  value={socialDraft.call_to_action}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      call_to_action: e.target.value,
                                    }))
                                  }
                                  placeholder="Book a spot today"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>Hashtags</Label>
                                <Input
                                  value={socialDraft.hashtags}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      hashtags: e.target.value,
                                    }))
                                  }
                                  placeholder="#tutoring #learning"
                                />
                              </div>
                              <div className="grid gap-2 md:col-span-2">
                                <Label>Extra Notes/Testimonials</Label>
                                <Textarea
                                  rows={3}
                                  value={socialDraft.extra_notes}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      extra_notes: e.target.value,
                                    }))
                                  }
                                  placeholder="Any extra details which can be considerd by AI in post text writing, or, enter testimonials here for the Success Story template."
                                />
                              </div>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="text-base font-semibold text-[#0b1f5f]">
                              Media & templates
                            </div>
                            <div className="mt-4 grid gap-4">
                              {socialMediaOptions.length > 0 ? (
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                  {socialMediaOptions.map((media) => {
                                    const checked =
                                      socialDraft.selected_media_ids.includes(
                                        media.id,
                                      );
                                    return (
                                      <label
                                        key={media.id}
                                        className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                                      >
                                        <input
                                          type="checkbox"
                                          className="absolute right-2 top-2 h-4 w-4 accent-[#ff9df9]"
                                          checked={checked}
                                          onChange={() =>
                                            toggleSocialMedia(media.id)
                                          }
                                        />
                                        {media.type === "VIDEO" ? (
                                          <video
                                            src={media.url}
                                            className="h-36 w-full object-cover"
                                          />
                                        ) : (
                                          <img
                                            src={media.url}
                                            alt=""
                                            className="h-36 w-full object-cover"
                                          />
                                        )}
                                        <div className="p-2 text-xs text-gray-600">
                                          {media.label}
                                        </div>
                                      </label>
                                    );
                                  })}
                                </div>
                              ) : null}
                              <div className="grid gap-6 lg:grid-cols-2">
                                <div className="grid gap-4">
                                  <div className="grid gap-2">
                                    <Label>Template style</Label>
                                    <select
                                      className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                      value={socialDraft.template_style}
                                      onChange={(e) =>
                                        applySocialTemplateStyle(e.target.value)
                                      }
                                    >
                                      <option value="">Select a template style</option>
                                      {SOCIAL_TEMPLATE_STYLES.map((style) => (
                                        <option key={style} value={style}>
                                          {style}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label>Layout preset</Label>
                                    <select
                                      className="h-10 rounded-xl border border-gray-200 bg-white px-3 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                                      value={socialDraft.layout_preset}
                                      disabled={socialDraft.template_style === "Success story"}
                                      onChange={(e) =>
                                        applySocialLayoutPreset(
                                          e.target.value,
                                          socialDraft.aspect_ratio,
                                        )
                                      }
                                    >
                                      <option value="">Select a layout preset</option>
                                      {SOCIAL_LAYOUT_PRESETS.map((preset) => (
                                        <option key={preset} value={preset}>
                                          {preset}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label>Aspect ratio</Label>
                                    <select
                                      className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                      value={socialDraft.aspect_ratio}
                                      onChange={(e) =>
                                        setSocialDraft((prev) => ({
                                          ...prev,
                                          aspect_ratio: e.target.value,
                                        }))
                                      }
                                    >
                                      <option value="">Select an aspect ratio</option>
                                      {SOCIAL_ASPECT_RATIOS.map((ratio) => (
                                        <option
                                          key={ratio.value}
                                          value={ratio.value}
                                        >
                                          {ratio.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="grid gap-2">
                                  <Label>Presets</Label>
                                  <div
                                    ref={socialPresetCarouselRef}
                                    className="itutoros-carousel px-[2px] py-[2px]"
                                  >
                                    <div
                                      aria-hidden
                                      className="shrink-0"
                                      style={{
                                        flex: "0 0 max(8px, calc(50% - 129px))",
                                      }}
                                    />
                                    {SOCIAL_PRESET_CAROUSEL_ITEMS.map(
                                      (item) => {
                                        const selected =
                                          item.id === selectedCarouselPresetId;
                                        return (
                                          <button
                                            key={item.id}
                                            type="button"
                                            ref={(node) => {
                                              socialPresetRefs.current[
                                                item.id
                                              ] = node;
                                            }}
                                            className={`itutoros-carousel-card !basis-[258px] relative min-w-[178px] overflow-hidden rounded-xl border bg-white text-left shadow-sm transition ${
                                              selected
                                                ? "border-[#ff9df9] ring-2 ring-[#ff9df9]"
                                                : "border-gray-200"
                                            }`}
                                            style={{
                                              scrollSnapAlign: "center",
                                            }}
                                            onClick={() =>
                                              applySocialLayoutPreset(
                                                item.layout_preset,
                                                item.aspect_ratio,
                                              )
                                            }
                                          >
                                            <img
                                              src={
                                                selected
                                                  ? item.selected_src
                                                  : item.unselected_src
                                              }
                                              alt={item.label}
                                              className="h-[110px] w-full bg-gray-50 p-2 object-contain"
                                            />
                                            <div className="px-2 py-2 text-xs text-gray-600">
                                              {item.label}
                                            </div>
                                          </button>
                                        );
                                      },
                                    )}
                                    <div
                                      aria-hidden
                                      className="shrink-0"
                                      style={{
                                        flex: "0 0 max(8px, calc(50% - 129px))",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  className="itutoros-settings-btn itutoros-settings-btn-primary"
                                  onClick={generateBlankSocialPost}
                                >
                                  Generate Post
                                </button>
                              </div>
                              <div className="rounded-xl border border-gray-200 bg-white p-3">
                                <div className="text-sm font-semibold text-gray-700">
                                  Preview
                                </div>
                                <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-2">
                                  <div className="relative flex flex-wrap items-center gap-2">
                                    <button
                                      type="button"
                                      title="Undo"
                                      className={SOCIAL_TOOLBAR_BTN_TOP}
                                      onClick={socialUndo}
                                      disabled={socialHistoryIndex <= 0}
                                    >
                                      <HugeiconsIcon icon={UndoIcon} size={SOCIAL_TOOLBAR_ICON_SIZE} />
                                    </button>
                                    <button
                                      type="button"
                                      title="Redo"
                                      className={SOCIAL_TOOLBAR_BTN_TOP}
                                      onClick={socialRedo}
                                      disabled={
                                        socialHistoryIndex < 0 ||
                                        socialHistoryIndex >= socialHistory.length - 1
                                      }
                                    >
                                      <HugeiconsIcon icon={RedoIcon} size={SOCIAL_TOOLBAR_ICON_SIZE} />
                                    </button>
                                    <button
                                      type="button"
                                      title="Align left"
                                      className={`${SOCIAL_TOOLBAR_BTN_TOP} ${
                                        socialToolAlignX === "left" ? SOCIAL_TOOLBAR_BTN_SELECTED : ""
                                      }`}
                                      onClick={() => setSocialToolAlignX("left")}
                                    >
                                      <HugeiconsIcon
                                        icon={AlignLeftIcon}
                                        size={SOCIAL_TOOLBAR_ICON_SIZE}
                                        color={socialIconColor(socialToolAlignX === "left")}
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      title="Align center"
                                      className={`${SOCIAL_TOOLBAR_BTN_TOP} ${
                                        socialToolAlignX === "center" ? SOCIAL_TOOLBAR_BTN_SELECTED : ""
                                      }`}
                                      onClick={() => setSocialToolAlignX("center")}
                                    >
                                      <HugeiconsIcon
                                        icon={AlignHorizontalCenterIcon}
                                        size={SOCIAL_TOOLBAR_ICON_SIZE}
                                        color={socialIconColor(socialToolAlignX === "center")}
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      title="Align right"
                                      className={`${SOCIAL_TOOLBAR_BTN_TOP} ${
                                        socialToolAlignX === "right" ? SOCIAL_TOOLBAR_BTN_SELECTED : ""
                                      }`}
                                      onClick={() => setSocialToolAlignX("right")}
                                    >
                                      <HugeiconsIcon
                                        icon={AlignRightIcon}
                                        size={SOCIAL_TOOLBAR_ICON_SIZE}
                                        color={socialIconColor(socialToolAlignX === "right")}
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      title="Shadow options (hold)"
                                      className={SOCIAL_TOOLBAR_BTN_TOP}
                                      onClick={() => setSocialShadowPopupOpen(true)}
                                      {...socialToolButtonHandlers(setSocialShadowPopupOpen)}
                                    >
                                      <span className="relative inline-block h-6 w-6">
                                        <span className="absolute left-[3px] top-[3px] h-[15px] w-[15px] border-[2.4px] border-black" />
                                        <span className="absolute left-0 top-0 h-[15px] w-[15px] border-[2.4px] border-black bg-white" />
                                      </span>
                                    </button>
                                    <button
                                      type="button"
                                      title="Outline options (hold)"
                                      className={SOCIAL_TOOLBAR_BTN_TOP}
                                      onClick={() => setSocialOutlinePopupOpen(true)}
                                      {...socialToolButtonHandlers(setSocialOutlinePopupOpen)}
                                    >
                                      <span
                                        className="inline-flex h-6 w-6 items-center justify-center text-[21px] font-extrabold leading-none text-white"
                                        style={{
                                          textShadow:
                                            "-1.4px -1.4px 0 #000, 1.4px -1.4px 0 #000, -1.4px 1.4px 0 #000, 1.4px 1.4px 0 #000, 0 -1.4px 0 #000, 0 1.4px 0 #000, -1.4px 0 0 #000, 1.4px 0 0 #000",
                                        }}
                                      >
                                        A
                                      </span>
                                    </button>

                                    <label className="ml-auto block rounded-md border border-gray-200 bg-white p-1">
                                      <input
                                        type="color"
                                        value={socialToolColor}
                                        onChange={(e) => applySocialTextColor(e.target.value)}
                                        className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
                                        title="Text color"
                                      />
                                    </label>
                                    <input
                                      type="number"
                                      min={8}
                                      max={220}
                                      value={socialToolFontSize}
                                      onChange={(e) => {
                                        const next =
                                          Number.parseInt(e.target.value || "0", 10) ||
                                          socialToolFontSize;
                                        applySocialFontSize(next);
                                      }}
                                      className="h-9 w-20 rounded-md border border-gray-200 bg-white px-2 text-xs"
                                      title="Font size"
                                    />
                                    <select
                                      value={socialPreviewZoomMode}
                                      onChange={(e) =>
                                        setSocialPreviewZoomMode(
                                          (e.target.value as "fit" | "100" | "150" | "200") ??
                                            "fit",
                                        )
                                      }
                                      className="h-9 rounded-md border border-gray-200 bg-white px-2 text-xs font-semibold text-gray-700"
                                      title="Preview zoom"
                                    >
                                      {SOCIAL_PREVIEW_ZOOM_MODES.map((mode) => (
                                        <option key={mode.value} value={mode.value}>
                                          {mode.label}
                                        </option>
                                      ))}
                                    </select>

                                    {socialShadowPopupOpen ? (
                                      <div className="absolute left-0 top-full z-40 mt-2 grid min-w-[260px] gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                                        <input type="number" min={0} max={360} value={socialToolShadowAngle} onChange={(e) => setSocialToolShadowAngle(Math.max(0, Math.min(360, Number.parseInt(e.target.value || "0", 10) || 0)))} className="h-8 rounded-md border border-gray-200 px-2 text-xs" title="Angle" />
                                        <input type="color" value={socialToolShadowColor} onChange={(e) => setSocialToolShadowColor(e.target.value)} className="h-8 rounded-md border border-gray-200 p-0" title="Color" />
                                        <input type="number" min={0} max={100} value={socialToolShadowOpacity} onChange={(e) => setSocialToolShadowOpacity(Math.max(0, Math.min(100, Number.parseInt(e.target.value || "0", 10) || 0)))} className="h-8 rounded-md border border-gray-200 px-2 text-xs" title="Opacity" />
                                        <input type="number" min={0} max={120} value={socialToolShadowSize} onChange={(e) => setSocialToolShadowSize(Math.max(0, Math.min(120, Number.parseInt(e.target.value || "0", 10) || 0)))} className="h-8 rounded-md border border-gray-200 px-2 text-xs" title="Size" />
                                        <input type="number" min={0} max={120} value={socialToolShadowDistance} onChange={(e) => setSocialToolShadowDistance(Math.max(0, Math.min(120, Number.parseInt(e.target.value || "0", 10) || 0)))} className="h-8 rounded-md border border-gray-200 px-2 text-xs" title="Distance" />
                                        <div className="flex justify-end gap-2">
                                          <button
                                            type="button"
                                            className="itutoros-settings-btn itutoros-settings-btn-secondary !px-3 !py-1 !text-xs"
                                            onClick={() => {
                                              setSocialToolShadowOpacity(0);
                                              setSocialToolShadowSize(0);
                                              setSocialToolShadowDistance(0);
                                              setSocialShadowPopupOpen(false);
                                            }}
                                          >
                                            Remove
                                          </button>
                                          <button
                                            type="button"
                                            className="itutoros-settings-btn itutoros-settings-btn-primary !px-3 !py-1 !text-xs"
                                            onClick={() => setSocialShadowPopupOpen(false)}
                                          >
                                            OK
                                          </button>
                                        </div>
                                      </div>
                                    ) : null}

                                    {socialOutlinePopupOpen ? (
                                      <div className="absolute left-[180px] top-full z-40 mt-2 grid min-w-[260px] gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                                        <input type="color" value={socialToolOutlineColor} onChange={(e) => setSocialToolOutlineColor(e.target.value)} className="h-8 rounded-md border border-gray-200 p-0" title="Outline color" />
                                        <input type="number" min={0} max={24} value={socialToolOutlineWidth} onChange={(e) => setSocialToolOutlineWidth(Math.max(0, Math.min(24, Number.parseInt(e.target.value || "0", 10) || 0)))} className="h-8 rounded-md border border-gray-200 px-2 text-xs" title="Outline width" />
                                        <div className="grid grid-cols-3 gap-2">
                                          <button type="button" className={`${SOCIAL_TOOLBAR_BTN_MINI} ${socialToolOutlinePosition === "inside" ? SOCIAL_TOOLBAR_BTN_SELECTED : ""}`} onClick={() => setSocialToolOutlinePosition("inside")} title="Inside">
                                            <HugeiconsIcon
                                              icon={StrokeInsideIcon}
                                              size={14}
                                              color={socialIconColor(socialToolOutlinePosition === "inside")}
                                            />
                                          </button>
                                          <button type="button" className={`${SOCIAL_TOOLBAR_BTN_MINI} ${socialToolOutlinePosition === "center" ? SOCIAL_TOOLBAR_BTN_SELECTED : ""}`} onClick={() => setSocialToolOutlinePosition("center")} title="Center">
                                            <HugeiconsIcon
                                              icon={StrokeCenterIcon}
                                              size={14}
                                              color={socialIconColor(socialToolOutlinePosition === "center")}
                                            />
                                          </button>
                                          <button type="button" className={`${SOCIAL_TOOLBAR_BTN_MINI} ${socialToolOutlinePosition === "outside" ? SOCIAL_TOOLBAR_BTN_SELECTED : ""}`} onClick={() => setSocialToolOutlinePosition("outside")} title="Outside">
                                            <HugeiconsIcon
                                              icon={StrokeOutsideIcon}
                                              size={14}
                                              color={socialIconColor(socialToolOutlinePosition === "outside")}
                                            />
                                          </button>
                                        </div>
                                        <input type="number" min={8} max={220} value={socialToolFontSize} onChange={(e) => applySocialFontSize(Number.parseInt(e.target.value || "0", 10) || socialToolFontSize)} className="h-8 rounded-md border border-gray-200 px-2 text-xs" title="Font size" />
                                        <div className="flex justify-end gap-2">
                                          <button
                                            type="button"
                                            className="itutoros-settings-btn itutoros-settings-btn-secondary !px-3 !py-1 !text-xs"
                                            onClick={() => {
                                              setSocialToolOutlineWidth(0);
                                              setSocialOutlinePopupOpen(false);
                                            }}
                                          >
                                            Remove
                                          </button>
                                          <button
                                            type="button"
                                            className="itutoros-settings-btn itutoros-settings-btn-primary !px-3 !py-1 !text-xs"
                                            onClick={() => setSocialOutlinePopupOpen(false)}
                                          >
                                            OK
                                          </button>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="mt-3 grid gap-2 lg:grid-cols-[minmax(0,1fr)_200px]">
                                  <div className="min-w-0">
                                    <div
                                      ref={socialPreviewViewportRef}
                                      className={`relative w-full rounded-xl border border-gray-200 bg-gray-100/60 p-2 ${
                                        socialPreviewOverflowEnabled
                                          ? "overflow-auto"
                                          : "overflow-hidden"
                                      } ${
                                        socialPreviewIsPanning
                                          ? "cursor-grabbing select-none"
                                          : socialActiveTool === "shape"
                                            ? "cursor-crosshair"
                                          : socialActiveTool === "text"
                                            ? "cursor-text"
                                          : socialPreviewOverflowEnabled
                                            ? "cursor-grab"
                                            : "cursor-default"
                                      }`}
                                      style={{ height: `${socialPreviewViewportHeight}px` }}
                                      onPointerDown={beginSocialPreviewPan}
                                      onPointerMove={onSocialPreviewPanMove}
                                      onPointerUp={endSocialPreviewPan}
                                      onPointerCancel={endSocialPreviewPan}
                                    >
                                      <div
                                        className={`min-h-full min-w-full ${
                                          socialPreviewOverflowEnabled
                                            ? "block"
                                            : "flex items-center justify-center"
                                        }`}
                                      >
                                        <div
                                          ref={socialPreviewRef}
                                          className={`relative overflow-hidden rounded-xl border bg-white ${
                                            socialPreviewDropActive
                                              ? "border-[#ff9df9] ring-2 ring-[#ff9df9]"
                                              : "border-gray-200"
                                          } ${
                                            socialDraggingLayer
                                              ? "cursor-grabbing"
                                              : socialActiveTool === "text"
                                                ? "cursor-text"
                                              : socialActiveTool === "shape"
                                                ? "cursor-crosshair"
                                                : ""
                                          }`}
                                          style={{
                                            width: `${socialPreviewScaledWidth}px`,
                                            height: `${socialPreviewScaledHeight}px`,
                                            maxWidth: "none",
                                            flex: "0 0 auto",
                                          }}
                                          onDragOver={socialPreviewDropHandlers.onDragOver}
                                          onDragLeave={socialPreviewDropHandlers.onDragLeave}
                                          onDrop={socialPreviewDropHandlers.onDrop}
                                          onPointerDown={onSocialPreviewPointerDown}
                                          onPointerMove={onSocialPreviewPointerMove}
                                          onPointerUp={endSocialLayerDrag}
                                          onPointerCancel={endSocialLayerDrag}
                                          onClick={(event) => {
                                            if (socialActiveTool === "shape") return;
                                            if (socialActiveTool === "text") {
                                              if (socialSuppressTextInsertClickRef.current) {
                                                socialSuppressTextInsertClickRef.current = false;
                                                return;
                                              }
                                              addSocialTextLayerAtPoint(event);
                                            }
                                          }}
                                        >
                                    {socialLayerVisible.media ? (
                                      <div
                                        className="pointer-events-none absolute inset-0"
                                        style={{ zIndex: socialLayerZ("media") }}
                                      >
                                        {socialPreviewMediaResolved ? (
                                          socialPreviewMediaResolved.type === "VIDEO" ? (
                                            <video
                                              src={socialPreviewMediaResolved.url}
                                              className="h-full w-full object-cover"
                                            />
                                          ) : (
                                            <img
                                              src={socialPreviewMediaResolved.url}
                                              alt=""
                                              className="h-full w-full object-cover"
                                            />
                                          )
                                        ) : (
                                          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                                            Drag image tool here.
                                          </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/20" />
                                      </div>
                                    ) : null}
                                    {socialLayerOrder
                                      .filter(
                                        (layerId) =>
                                          isSocialImageLayer(layerId) &&
                                          layerId !== "media",
                                      )
                                      .map((layerId) => {
                                        if (!socialLayerVisible[layerId]) return null;
                                        const frame = socialLayerFrames[layerId];
                                        const imageMeta = socialImageLayers[layerId];
                                        if (!frame || !imageMeta?.url) return null;
                                        const isFooterBrandLayer =
                                          layerId === SOCIAL_BRAND_LAYER_ID;
                                        const isBandBrandLayer =
                                          layerId === SOCIAL_BAND_BRAND_LAYER_ID;
                                        const isSuccessBrandLayer =
                                          layerId === SOCIAL_SUCCESS_BRAND_IMAGE_LAYER_ID;
                                        const isBrandLayer =
                                          isFooterBrandLayer ||
                                          isBandBrandLayer ||
                                          isSuccessBrandLayer;
                                        const bandVerticalPosition =
                                          socialBandContactConfig === 3 ? "bottom" : "top";
                                        const bandHorizontalPosition =
                                          socialBandBrandAlign === "left"
                                            ? "left"
                                            : socialBandBrandAlign === "right"
                                              ? "right"
                                              : "center";
                                        const objectPosition = isFooterBrandLayer
                                          ? socialDraft.layout_preset === "Photo + footer"
                                            ? socialPhotoFooterBrandAlign === "left"
                                              ? "left top"
                                              : socialPhotoFooterBrandAlign === "right"
                                                ? "right top"
                                                : "center top"
                                            : socialFooterBrandSide === "right"
                                              ? "right bottom"
                                              : "left bottom"
                                          : isBandBrandLayer
                                            ? `${bandHorizontalPosition} ${bandVerticalPosition}`
                                            : isSuccessBrandLayer
                                              ? socialSuccessBrandSide === "right"
                                                ? "right bottom"
                                                : "left bottom"
                                            : "center center";
                                        return (
                                          <div
                                            key={layerId}
                                            className={`absolute overflow-hidden ${
                                              socialSelectedLayer === layerId
                                                ? "ring-2 ring-[#ff9df9]"
                                                : ""
                                            }`}
                                            style={{
                                              ...socialFrameToStyle(frame),
                                              zIndex: socialLayerZ(layerId),
                                              cursor:
                                                !socialLayerLocked[layerId] &&
                                                socialActiveTool === "pointer"
                                                  ? "move"
                                                  : socialActiveTool === "shape"
                                                    ? "crosshair"
                                                  : socialActiveTool === "text"
                                                    ? "text"
                                                  : "default",
                                              touchAction: "none",
                                            }}
                                            onPointerDown={(event) =>
                                              beginSocialLayerDrag(layerId, event)
                                            }
                                            onClick={(event) => {
                                              event.stopPropagation();
                                              if (socialActiveTool === "text") {
                                                if (socialSuppressTextInsertClickRef.current) {
                                                  socialSuppressTextInsertClickRef.current = false;
                                                  return;
                                                }
                                                addSocialTextLayerAtPoint(event);
                                                return;
                                              }
                                              socialSelectLayer(layerId);
                                            }}
                                            onDoubleClick={(event) => {
                                              event.stopPropagation();
                                              socialSelectLayer(layerId);
                                              setSocialImagePickerMode("replace");
                                              setSocialImagePickerOpen(true);
                                            }}
                                          >
                                            {imageMeta.type === "VIDEO" ? (
                                              <video
                                                src={imageMeta.url}
                                                className={`h-full w-full ${
                                                  isBrandLayer ? "object-contain" : "object-cover"
                                                }`}
                                                style={{ objectPosition }}
                                              />
                                            ) : (
                                              <img
                                                src={imageMeta.url}
                                                alt=""
                                                className={`h-full w-full ${
                                                  isBrandLayer ? "object-contain" : "object-cover"
                                                }`}
                                                style={{ objectPosition }}
                                              />
                                            )}
                                          </div>
                                        );
                                      })}
                                    {socialLayerOrder
                                      .filter((layerId) => isSocialShapeLayer(layerId))
                                      .map((layerId) => {
                                        if (!socialLayerVisible[layerId]) return null;
                                        return (
                                          <div
                                            key={layerId}
                                            className={`absolute ${
                                              socialSelectedLayer === layerId
                                                ? "ring-2 ring-[#ff9df9]"
                                                : ""
                                            }`}
                                            style={{
                                              ...socialShapeLayerStyle(layerId),
                                              zIndex: socialLayerZ(layerId),
                                              cursor:
                                                !socialLayerLocked[layerId] &&
                                                socialActiveTool === "pointer"
                                                  ? "move"
                                                  : socialActiveTool === "shape"
                                                    ? "crosshair"
                                                  : socialActiveTool === "text"
                                                    ? "text"
                                                  : "default",
                                              touchAction: "none",
                                            }}
                                            onPointerDown={(event) =>
                                              beginSocialLayerDrag(layerId, event)
                                            }
                                            onClick={(event) => {
                                              event.stopPropagation();
                                              if (socialActiveTool === "text") {
                                                if (socialSuppressTextInsertClickRef.current) {
                                                  socialSuppressTextInsertClickRef.current = false;
                                                  return;
                                                }
                                                addSocialTextLayerAtPoint(event);
                                                return;
                                              }
                                              socialSelectLayer(layerId);
                                            }}
                                          />
                                        );
                                      })}
                                    {socialRenderPresetTextLayers()}
                                    {socialLayerOrder
                                      .filter((layerId) => isSocialCustomTextLayer(layerId))
                                      .map((layerId) =>
                                        socialRenderTextLayer({
                                          keyId: `custom-text-${layerId}`,
                                          layerId,
                                          text:
                                            socialInlineTextOverrides[layerId] ||
                                            "Edit text",
                                          fallbackSize:
                                            socialTextFontSizes[layerId] ??
                                            socialToolFontSize ??
                                            48,
                                          alignX: socialToolAlignX,
                                          alignY: socialToolAlignY,
                                          fontWeight: 700,
                                        }),
                                      )}
                                    {socialRenderSelectionBox(socialSelectedLayer)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid content-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
                                    <div className="grid grid-cols-2 gap-2">
                                      <button
                                        type="button"
                                        title="Pointer tool"
                                        className={`${SOCIAL_TOOLBAR_BTN_RIGHT} ${
                                          socialActiveTool === "pointer"
                                            ? SOCIAL_TOOLBAR_BTN_SELECTED
                                            : ""
                                        }`}
                                        onClick={() => setSocialActiveTool("pointer")}
                                      >
                                        <HugeiconsIcon
                                          icon={CursorPointer01Icon}
                                          size={SOCIAL_TOOLBAR_ICON_SIZE}
                                          color={socialIconColor(socialActiveTool === "pointer")}
                                        />
                                      </button>
                                      <button
                                        type="button"
                                        title="Text tool (hold for font)"
                                        className={`${SOCIAL_TOOLBAR_BTN_RIGHT} ${
                                          socialActiveTool === "text"
                                            ? SOCIAL_TOOLBAR_BTN_SELECTED
                                            : ""
                                        }`}
                                        onClick={() => {
                                          setSocialActiveTool("text");
                                          if (socialDraft.layout_preset === "Photo + footer") {
                                            if (
                                              socialSelectedLayer !== "headline" &&
                                              socialSelectedLayer !== "start" &&
                                              socialSelectedLayer !== "cta" &&
                                              socialSelectedLayer !== SOCIAL_CONTACT_LAYER_ID &&
                                              socialSelectedLayer !== SOCIAL_BRAND_LAYER_ID
                                            ) {
                                              socialSelectLayer("headline");
                                            }
                                          } else if (
                                            socialSelectedLayer !== "headline" &&
                                            socialSelectedLayer !== "start" &&
                                            socialSelectedLayer !== "cta"
                                          ) {
                                            socialSelectLayer("headline");
                                          }
                                        }}
                                        onDoubleClick={() => setSocialFontPopupOpen(true)}
                                        {...socialToolButtonHandlers(setSocialFontPopupOpen)}
                                      >
                                        <HugeiconsIcon
                                          icon={CursorTextIcon}
                                          size={SOCIAL_TOOLBAR_ICON_SIZE}
                                          color={socialIconColor(socialActiveTool === "text")}
                                        />
                                      </button>
                                      <div className="relative">
                                        <button
                                          type="button"
                                          title="Shape tool (hold to choose shape)"
                                          className={`${SOCIAL_TOOLBAR_BTN_RIGHT} ${
                                            socialActiveTool === "shape"
                                              ? SOCIAL_TOOLBAR_BTN_SELECTED
                                              : ""
                                          }`}
                                          onClick={() => {
                                            setSocialActiveTool("shape");
                                          }}
                                          {...socialToolButtonHandlers(
                                            setSocialShapePopupOpen,
                                          )}
                                        >
                                          <span
                                            className={`block h-6 w-6 bg-current ${socialShapeClassByKind(
                                              socialCurrentShapeKind,
                                            )}`}
                                            style={{
                                              color: socialIconColor(
                                                socialActiveTool === "shape",
                                              ),
                                            }}
                                          />
                                        </button>
                                        {socialShapePopupOpen ? (
                                          <div className="absolute right-full top-0 z-40 mr-2 grid min-w-[240px] gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                                            <div className="grid grid-cols-4 gap-2">
                                              {SOCIAL_SHAPE_OPTIONS.map((option) => (
                                                <button
                                                  key={option.key}
                                                  type="button"
                                                  className={`flex h-12 items-center justify-center rounded-lg border ${
                                                    socialCurrentShapeKind === option.key
                                                      ? "border-[#ff9df9] ring-2 ring-[#ff9df9]"
                                                      : "border-gray-200"
                                                  }`}
                                                  onClick={() => applySocialShapeKind(option.key)}
                                                >
                                                  <div
                                                    className={`h-7 w-7 bg-[#0b1f5f] ${option.shapeClass}`}
                                                  />
                                                </button>
                                              ))}
                                            </div>
                                            <div className="flex justify-end gap-2">
                                              <button
                                                type="button"
                                                className="itutoros-settings-btn itutoros-settings-btn-secondary !px-3 !py-1 !text-xs"
                                                onClick={() =>
                                                  setSocialShapePopupOpen(false)
                                                }
                                              >
                                                OK
                                              </button>
                                            </div>
                                          </div>
                                        ) : null}
                                      </div>
                                      <label
                                        className={`${SOCIAL_TOOLBAR_BTN_RIGHT} cursor-pointer`}
                                        title="Shape color"
                                      >
                                        <HugeiconsIcon
                                          icon={ColorPickerIcon}
                                          size={SOCIAL_TOOLBAR_ICON_SIZE}
                                          color={socialIconColor(false)}
                                        />
                                        <input
                                          type="color"
                                          className="sr-only"
                                          value={socialShapeColor}
                                          onChange={(e) => applySocialShapeColor(e.target.value)}
                                        />
                                      </label>
                                      <button
                                        type="button"
                                        draggable
                                        title="Image tool (drag into preview)"
                                        className={`${SOCIAL_TOOLBAR_BTN_RIGHT} ${
                                          socialActiveTool === "image"
                                            ? SOCIAL_TOOLBAR_BTN_SELECTED
                                            : ""
                                        }`}
                                        onDragStart={(event) => {
                                          event.dataTransfer.setData(
                                            socialDragToolType,
                                            "image",
                                          );
                                          setSocialActiveTool("image");
                                        }}
                                        onClick={() => {
                                          setSocialActiveTool("image");
                                          setSocialImagePickerMode("add");
                                          setSocialImagePickerOpen(true);
                                        }}
                                      >
                                        <HugeiconsIcon
                                          icon={Image01Icon}
                                          size={SOCIAL_TOOLBAR_ICON_SIZE}
                                          color={socialIconColor(socialActiveTool === "image")}
                                        />
                                      </button>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-white p-2">
                                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        <HugeiconsIcon icon={Layers01Icon} size={14} />
                                        Layers
                                      </div>
                                      <div className="grid gap-1">
                                        {socialLayerOrder.map((layerId) => (
                                          <div
                                            key={layerId}
                                            className={`grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-2 rounded-md px-1 py-1 ${
                                              socialSelectedLayer === layerId
                                                ? "bg-[#dbeafe]"
                                                : ""
                                            }`}
                                            onClick={() => socialSelectLayer(layerId)}
                                            onDoubleClick={() => {
                                              if (!isSocialImageLayer(layerId)) return;
                                              socialSelectLayer(layerId);
                                              setSocialImagePickerMode("replace");
                                              setSocialImagePickerOpen(true);
                                            }}
                                          >
                                            <div className="h-10 w-10 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                                              {socialLayerThumbnail(layerId)}
                                            </div>
                                            <span className="truncate text-[11px] font-semibold text-gray-700">
                                              {SOCIAL_LAYER_LABELS[layerId] ??
                                                (isSocialImageLayer(layerId)
                                                  ? "Image"
                                                  : null) ??
                                                (isSocialCustomTextLayer(layerId)
                                                  ? "Text"
                                                  : null) ??
                                                (isSocialShapeLayer(layerId)
                                                  ? "Shape"
                                                  : layerId)}
                                            </span>
                                            <div className="flex items-center gap-1">
                                              <button
                                                type="button"
                                                className="rounded-md border border-gray-200 p-1 text-gray-600 hover:bg-gray-100"
                                                title={
                                                  socialLayerLocked[layerId]
                                                    ? "Unlock"
                                                    : "Lock"
                                                }
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  setSocialLayerLocked((prev) => ({
                                                    ...prev,
                                                    [layerId]: !prev[layerId],
                                                  }));
                                                }}
                                              >
                                                <HugeiconsIcon
                                                  icon={
                                                    socialLayerLocked[layerId]
                                                      ? LockIcon
                                                      : UserUnlock01Icon
                                                  }
                                                  size={12}
                                                />
                                              </button>
                                              <button
                                                type="button"
                                                className="rounded-md border border-gray-200 p-1 text-gray-600 hover:bg-gray-100"
                                                title={
                                                  socialLayerVisible[layerId]
                                                    ? "Hide"
                                                    : "Show"
                                                }
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  setSocialLayerVisible((prev) => ({
                                                    ...prev,
                                                    [layerId]: !prev[layerId],
                                                  }));
                                                }}
                                              >
                                                <HugeiconsIcon
                                                  icon={
                                                    socialLayerVisible[layerId]
                                                      ? ViewIcon
                                                      : ViewOffIcon
                                                  }
                                                  size={12}
                                                />
                                              </button>
                                              <button
                                                type="button"
                                                className="rounded-md border border-gray-200 p-1 text-gray-600 hover:bg-gray-100"
                                                title="Move up"
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  moveSocialLayer(layerId, "up");
                                                }}
                                              >
                                                <HugeiconsIcon
                                                  icon={ArrowUp01Icon}
                                                  size={12}
                                                />
                                              </button>
                                              <button
                                                type="button"
                                                className="rounded-md border border-gray-200 p-1 text-gray-600 hover:bg-gray-100"
                                                title="Move down"
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  moveSocialLayer(layerId, "down");
                                                }}
                                              >
                                                <HugeiconsIcon
                                                  icon={ArrowDown01Icon}
                                                  size={12}
                                                />
                                              </button>
                                              <button
                                                type="button"
                                                className="rounded-md border border-rose-200 p-1 text-rose-600 hover:bg-rose-50"
                                                title="Delete"
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  socialDeleteLayer(layerId);
                                                }}
                                              >
                                                <HugeiconsIcon
                                                  icon={Cancel01Icon}
                                                  size={12}
                                                />
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <div className="text-base font-semibold text-[#0b1f5f]">
                                  Post Text
                                </div>
                                <div className="text-sm text-gray-600">
                                  Generate copy with AI, then tweak it before
                                  posting.
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                {(() => {
                                  const aiKey = "social:copy";
                                  const isLoading = Boolean(
                                    aiRewriteLoading[aiKey],
                                  );
                                  return (
                                    <button
                                      type="button"
                                      className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                      onClick={generateSocialCopy}
                                      disabled={isLoading}
                                    >
                                      {isLoading
                                        ? "Generating..."
                                        : socialDraft.generated_copy.trim()
                                          ? "Regenerate with AI"
                                          : "Generate with AI"}
                                    </button>
                                  );
                                })()}
                                <button
                                  type="button"
                                  className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                  onClick={discardSocialCopy}
                                  disabled={!socialDraft.generated_copy.trim()}
                                >
                                  Discard Text
                                </button>
                              </div>
                            </div>
                            <div className="mt-4 grid gap-2">
                              <Textarea
                                rows={8}
                                value={socialDraft.generated_copy}
                                onChange={(e) =>
                                  setSocialDraft((prev) => ({
                                    ...prev,
                                    generated_copy: e.target.value,
                                  }))
                                }
                                placeholder="Generated copy will appear here."
                              />
                              {aiRewrites["social:copy"] ? (
                                <div className="flex items-center gap-3 text-xs">
                                  <button
                                    type="button"
                                    className="flex items-center gap-1 font-semibold text-green-600 hover:text-green-700"
                                    onClick={() =>
                                      clearAiRewrite("social:copy")
                                    }
                                  >
                                    <HugeiconsIcon
                                      icon={CheckmarkCircle01Icon}
                                      size={14}
                                      className="text-green-600"
                                    />
                                    Accept
                                  </button>
                                  <button
                                    type="button"
                                    className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700"
                                    onClick={() => {
                                      const previous =
                                        aiRewrites["social:copy"]?.previous ??
                                        "";
                                      setSocialDraft((prev) => ({
                                        ...prev,
                                        generated_copy: previous,
                                      }));
                                      clearAiRewrite("social:copy");
                                    }}
                                  >
                                    <HugeiconsIcon
                                      icon={Cancel01Icon}
                                      size={14}
                                      className="text-red-600"
                                    />
                                    Reject
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-end gap-2">
                            <button
                              type="button"
                              className="itutoros-settings-btn itutoros-settings-btn-secondary"
                              onClick={() => void saveSocialPost("DRAFT")}
                            >
                              Save Draft
                            </button>
                            <button
                              type="button"
                              className="itutoros-settings-btn itutoros-settings-btn-primary"
                              onClick={() => void saveSocialPost("READY")}
                            >
                              Save Post
                            </button>
                            <button
                              type="button"
                              className="itutoros-settings-btn itutoros-settings-btn-secondary"
                              onClick={() => {
                                const confirmed = window.confirm(
                                  "Discard this post builder draft and clear all fields?",
                                );
                                if (!confirmed) return;
                                clearSocialBuilder();
                              }}
                            >
                              Discard
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
    </>
  );
}


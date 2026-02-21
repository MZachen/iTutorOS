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
    cta: 20,
  });
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
  const [socialPreviewDropActive, setSocialPreviewDropActive] = useState(false);
  const socialPreviewRef = useRef(null);
  const [socialShadowPopupOpen, setSocialShadowPopupOpen] = useState(false);
  const [socialOutlinePopupOpen, setSocialOutlinePopupOpen] = useState(false);
  const [socialFontPopupOpen, setSocialFontPopupOpen] = useState(false);
  const [socialShapePopupOpen, setSocialShapePopupOpen] = useState(false);
  const [socialTextEditorOpen, setSocialTextEditorOpen] = useState(false);
  const [socialTextEditorLayer, setSocialTextEditorLayer] = useState("headline");
  const [socialTextEditorValue, setSocialTextEditorValue] = useState("");
  const [socialLayerFrames, setSocialLayerFrames] = useState<
    Record<string, { x: number; y: number; width: number; height: number }>
  >({});
  const [socialDraggingLayer, setSocialDraggingLayer] = useState("");
  const socialDragStateRef = useRef(null);
  const socialResizeStateRef = useRef(null);
  const socialShapeDrawStateRef = useRef(null);
  const socialShapeCounterRef = useRef(1);
  const socialImageCounterRef = useRef(1);
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
    media: "Media",
    shape: "Shape",
    headline: "Headline",
    start: "Start Date",
    cta: "Footer Info",
    footer: "Footer",
    brand: "Brand",
    contact: "Contact",
    datebox: "Date Box",
  };
  const clampLayerValue = (value, min, max) => Math.max(min, Math.min(max, value));
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
        headline: { x: 45, y: 790, width: 910, height: 105 },
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
      socialDraft.template_style === "Class announcement" &&
      socialDraft.layout_preset === "Bold headline";

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

        const footerInfoText = String(socialAnnouncementFooterInfo.text ?? "");
        const footerInfoFontPt = resolveAnnouncementFooterInfoFontPt(footerInfoText);
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

  const socialShadowCss = useMemo(() => {
    const normalized = String(socialToolShadowColor || "#000000").trim();
    const hex = normalized.replace("#", "");
    const fullHex =
      hex.length === 3
        ? hex
            .split("")
            .map((ch) => ch + ch)
            .join("")
        : hex.padEnd(6, "0").slice(0, 6);
    const r = Number.parseInt(fullHex.slice(0, 2), 16) || 0;
    const g = Number.parseInt(fullHex.slice(2, 4), 16) || 0;
    const b = Number.parseInt(fullHex.slice(4, 6), 16) || 0;
    const opacity = Math.max(0, Math.min(100, socialToolShadowOpacity)) / 100;
    const angle = (Math.max(0, Math.min(360, socialToolShadowAngle)) * Math.PI) / 180;
    const size = Math.max(0, socialToolShadowSize);
    const distance = Math.max(0, socialToolShadowDistance);
    const offsetX = Math.round(Math.cos(angle) * distance);
    const offsetY = Math.round(Math.sin(angle) * distance);
    const blur = Math.max(1, Math.round(size));
    return `${offsetX}px ${offsetY}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacity})`;
  }, [
    socialToolShadowAngle,
    socialToolShadowColor,
    socialToolShadowDistance,
    socialToolShadowOpacity,
    socialToolShadowSize,
  ]);

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

  const previewTextStyle = (target, fallbackSize) => {
    const isSelected = socialToolTarget === target;
    const forceAnnouncementHeadlineStyle =
      target === "headline" &&
      socialDraft.template_style === "Class announcement" &&
      socialDraft.layout_preset === "Bold headline";
    const layerFontSize = socialTextFontSizes[target] ?? fallbackSize;
    if (forceAnnouncementHeadlineStyle) {
      return {
        color: "#ffffff",
        fontSize: `${layerFontSize}px`,
        WebkitTextStroke: "0px transparent",
        textShadow: buildOutsideTextStrokeShadow(
          Math.max(0, socialToolOutlineWidth),
          socialToolOutlineColor,
        ),
        lineHeight: 1.1,
        fontFamily: socialFontFamily,
      };
    }
    if (!isSelected && !forceAnnouncementHeadlineStyle) {
      return {
        color: "#ffffff",
        fontSize: `${layerFontSize}px`,
        lineHeight: 1.1,
        fontFamily: socialFontFamily,
      };
    }
    return {
      color: socialToolColor,
      fontSize: `${layerFontSize}px`,
      WebkitTextStroke: `${Math.max(0, socialToolOutlineWidth)}px ${socialToolOutlineColor}`,
      textShadow: socialShadowCss,
      lineHeight: 1.1,
      fontFamily: socialFontFamily,
    };
  };

  const applySocialFontSize = (nextSize, target = socialToolTarget) => {
    const clamped = Math.max(8, Math.min(220, Number(nextSize) || 48));
    setSocialToolFontSize(clamped);
    if (target === "headline" || target === "start" || target === "cta") {
      setSocialTextFontSizes((prev) => ({ ...prev, [target]: clamped }));
    }
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
        socialPreviewOverrideUrl,
      }),
    [
      socialToolTarget,
      socialToolColor,
      socialToolFontSize,
      socialTextFontSizes,
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
        cta: 20,
      },
    );
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
  const SOCIAL_HEADER_LAYER_ID = "shape";
  const SOCIAL_FOOTER_LAYER_ID = "footer";
  const SOCIAL_BRAND_LAYER_ID = "brand";
  const SOCIAL_CONTACT_LAYER_ID = "contact";
  const SOCIAL_DATE_BOX_LAYER_ID = "datebox";
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
  ];
  const formatBusinessPhone = (value) => {
    const digits = String(value ?? "").replace(/\D/g, "");
    const normalized =
      digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
    if (normalized.length !== 10) return "";
    return `(${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6)}`;
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
  const socialAnnouncementFooterInfo = useMemo(
    () =>
      computeAnnouncementFooterInfo({
        source: socialFooterInfoSource,
        ageRange: socialDraft.age_range,
        locationDetail: socialDraft.location_detail,
        callToAction: socialDraft.call_to_action,
        fallbackMode: socialFooterInfoEmptyMode,
        fallbackName: socialFooterInfoEmptyName,
      }),
    [
      socialFooterInfoSource,
      socialFooterInfoEmptyMode,
      socialFooterInfoEmptyName,
      socialDraft.age_range,
      socialDraft.location_detail,
      socialDraft.call_to_action,
    ],
  );
  const resolveAnnouncementFooterInfoFontPt = (value: string) =>
    String(value ?? "").trim().toLowerCase() === "elementary school camps" ? 70 : 100;

  const measureAnnouncementFooterInfoHeight = ({
    text,
    fontSize = 100,
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
      fontSize: Math.max(8, Number(fontSize) || 100),
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
    const footerHeight = clampLayerValue(Math.round(80 / normalizedScaleY), 24, 200);
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
    String(layerId || "").startsWith(SOCIAL_IMAGE_LAYER_PREFIX);
  const isSocialShapeLayer = (layerId) =>
    layerId === SOCIAL_HEADER_LAYER_ID ||
    layerId === SOCIAL_FOOTER_LAYER_ID ||
    layerId === SOCIAL_DATE_BOX_LAYER_ID ||
    String(layerId || "").startsWith(SOCIAL_SHAPE_LAYER_PREFIX);
  const buildSocialShapeLayerId = () =>
    `${SOCIAL_SHAPE_LAYER_PREFIX}${Date.now()}-${socialShapeCounterRef.current++}`;
  const buildSocialImageLayerId = () =>
    `${SOCIAL_IMAGE_LAYER_PREFIX}${Date.now()}-${socialImageCounterRef.current++}`;
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
    const opacity = Math.max(0, Math.min(100, meta?.opacity ?? 60)) / 100;
    const base = {
      backgroundColor: color,
      opacity,
      ...socialFrameToStyle(frame),
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

  const generateBlankSocialPost = () => {
    const templateStyle = "Class announcement";
    const layoutPreset = "Bold headline";
    const aspectRatio = SOCIAL_ASPECT_RATIOS.some(
      (ratio) => ratio.value === socialDraft.aspect_ratio,
    )
      ? socialDraft.aspect_ratio
      : "1:1";
    const isCompanyLogoMedia = (media) => media?.id === "company-logo";
    const allImages = socialMediaOptions.filter((media) => media.type === "PHOTO");
    const allBackgroundImages = allImages.filter((media) => !isCompanyLogoMedia(media));
    const selectedImages = (socialDraft.selected_media_ids ?? [])
      .map((id) => allBackgroundImages.find((media) => media.id === id) ?? null)
      .filter(Boolean) as Array<(typeof socialMediaOptions)[number]>;
    const pool = selectedImages.length > 0 ? selectedImages : allBackgroundImages;

    const chosenMedia =
      pool.length === 0
        ? null
        : pool.length === 1
          ? pool[0]
          : pool[Math.floor(Math.random() * pool.length)];

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
    const dateX = randomDateSide === "right" ? 650 : 50;
    const dateWidth = 300;
    const dateHeight = 250;
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
    const randomFooterInfoSource =
      (["age", "location", "cta"] as const)[
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
      (["blank", "name", "hash-name", "tutoring"] as const)[
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
      callToAction: socialDraft.call_to_action,
      fallbackMode: randomFooterFallbackMode,
      fallbackName: randomFooterFallbackName,
    });

    const generatedHeadlineText =
      socialDraft.headline && socialDraft.headline.trim().length > 0
        ? socialDraft.headline
        : "Add Headline";
    const measuredHeadline = measureWrappedSocialText({
      text: generatedHeadlineText,
      fontSize: 75,
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
    const dateY = clampLayerValue(headlineHeight + 50, 0, 670);
    const announcementFooterFrame = resolveAnnouncementFooterFrame();
    const announcementBrandLogoFrame = resolveAnnouncementBrandLogoFrame();
    const footerInfoFrame = resolveAnnouncementFooterInfoFrame({
      text: generatedFooterInfo.text,
      fontSize: resolveAnnouncementFooterInfoFontPt(generatedFooterInfo.text),
      footerFrame: announcementFooterFrame,
    });

    setSocialLayerOrder(chosenMedia ? [...SOCIAL_ANNOUNCEMENT_LAYER_ORDER] : []);
    setSocialLayerVisible(
      chosenMedia
        ? {
            media: true,
            [SOCIAL_HEADER_LAYER_ID]: true,
            headline: true,
            cta: true,
            [SOCIAL_FOOTER_LAYER_ID]: true,
            [SOCIAL_BRAND_LAYER_ID]: true,
            [SOCIAL_CONTACT_LAYER_ID]: true,
            [SOCIAL_DATE_BOX_LAYER_ID]: true,
            start: true,
          }
        : {},
    );
    setSocialLayerLocked(
      chosenMedia
        ? {
            media: false,
            [SOCIAL_HEADER_LAYER_ID]: false,
            headline: false,
            cta: false,
            [SOCIAL_FOOTER_LAYER_ID]: false,
            [SOCIAL_BRAND_LAYER_ID]: false,
            [SOCIAL_CONTACT_LAYER_ID]: false,
            [SOCIAL_DATE_BOX_LAYER_ID]: false,
            start: false,
          }
        : {},
    );
    setSocialLayerFrames(
      chosenMedia
        ? {
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
          }
        : {},
    );
    setSocialImageLayers(
      chosenMedia && socialHasBrandLogo
        ? {
            [SOCIAL_BRAND_LAYER_ID]: {
              id: SOCIAL_BRAND_LAYER_ID,
              url: socialBrandLogoUrl,
              type: detectSocialMediaTypeFromUrl(socialBrandLogoUrl),
            },
          }
        : {},
    );
    setSocialShapeStyles(
      chosenMedia
        ? {
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
            },
          }
        : {},
    );
    setSocialToolTarget("headline");
    setSocialToolAlignX(randomAlign);
    setSocialToolAlignY("center");
    setSocialToolColor("#ffffff");
    setSocialToolFontSize(75);
    setSocialTextFontSizes((prev) => ({
      ...prev,
      headline: 75,
      start: SOCIAL_ANNOUNCEMENT_DATE_FONT_PT,
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
    setSocialSelectedLayer(chosenMedia ? "headline" : "");
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
        : "Post generated. No images available in Media & templates.",
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
    layerId === "headline" || layerId === "start" || layerId === "cta";

  const socialTextMaxWidthByLayout = (layoutPreset) => {
    if (layoutPreset === "Bold headline") {
      return { headline: 890, cta: 890 };
    }
    if (layoutPreset === "Band rows") {
      return { headline: 920, start: 920, cta: 920 };
    }
    if (layoutPreset === "Photo + footer") {
      return { headline: 910, cta: 910 };
    }
    if (layoutPreset === "Schedule list") {
      return { start: 500 };
    }
    return { headline: 900, start: 500, cta: 900 };
  };

  const socialRenderedLayerText = (layerId) => {
    if (layerId === "headline") {
      if (
        socialDraft.template_style === "Class announcement" &&
        socialDraft.layout_preset === "Bold headline"
      ) {
        return socialDraft.headline && socialDraft.headline.trim().length > 0
          ? socialDraft.headline
          : "Add Headline";
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
        socialDraft.template_style === "Class announcement" &&
        socialDraft.layout_preset === "Bold headline"
      ) {
        return socialAnnouncementFooterInfo.text || "";
      }
      if (socialDraft.layout_preset === "Bold headline") {
        return socialDraft.call_to_action || socialDraft.start_date || "Call to action";
      }
      if (socialDraft.layout_preset === "Photo + footer") {
        return socialDraft.call_to_action || socialDraft.location_detail || "Join us";
      }
      return socialDraft.call_to_action || "Call to action";
    }
    return "";
  };
  const socialLayerToDraftField = (layerId) => {
    if (layerId === "headline") return "headline";
    if (layerId === "start") return "start_date";
    if (layerId === "cta") return "call_to_action";
    return null;
  };

  const socialOpenTextEditor = (layerId) => {
    const field = socialLayerToDraftField(layerId);
    if (!field) return;
    setSocialTextEditorLayer(layerId);
    setSocialTextEditorValue(String(socialDraft[field] ?? ""));
    setSocialTextEditorOpen(true);
  };

  const applySocialTextEditor = () => {
    const field = socialLayerToDraftField(socialTextEditorLayer);
    if (!field) {
      setSocialTextEditorOpen(false);
      return;
    }
    const nextValue = socialTextEditorValue;
    setSocialDraft((prev) => ({
      ...prev,
      [field]: nextValue,
    }));
    setSocialTextEditorOpen(false);
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
    const previewRect =
      typeof window !== "undefined" ? socialPreviewRef.current?.getBoundingClientRect() : null;
    const pxPerUnitX =
      previewRect && previewRect.width > 0 ? previewRect.width / 1000 : 1;
    const pxPerUnitY =
      previewRect && previewRect.height > 0 ? previewRect.height / 1000 : pxPerUnitX;
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
    if (layerId === "headline" || layerId === "start" || layerId === "cta") {
      setSocialToolTarget(layerId);
      setSocialToolFontSize(socialTextFontSizes[layerId] ?? socialToolFontSize);
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
    if (isSocialShapeLayer(socialSelectedLayer)) return;
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
      if (isSocialTextLayer(layerId)) {
        const baseFont = Math.max(
          8,
          Number(
            resize.initialFontSize ??
              socialTextFontSizes[layerId] ??
              socialToolFontSize ??
              24,
          ) || 24,
        );
        const initialWidth = Math.max(1, Number(initialFrame.width) || 1);
        const initialHeight = Math.max(1, Number(initialFrame.height) || 1);
        const scaleX = width / initialWidth;
        const scaleY = height / initialHeight;
        const usesX = handle.includes("e") || handle.includes("w");
        const usesY = handle.includes("n") || handle.includes("s");
        const scale = usesX && usesY ? Math.max(scaleX, scaleY) : usesX ? scaleX : scaleY;
        const nextFont = clampLayerValue(Math.round(baseFont * scale), 8, 220);
        setSocialTextFontSizes((prev) => {
          const current = Number(prev[layerId] ?? 0);
          if (current === nextFont) return prev;
          return { ...prev, [layerId]: nextFont };
        });
        if (socialSelectedLayer === layerId) {
          setSocialToolFontSize(nextFont);
        }
      }
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
    return socialDraft.call_to_action || "Call to action";
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
          <div className="h-4 w-[84%] rounded-full border border-white/50 bg-[#0b1f5f]/80 shadow-sm" />
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

  const socialRenderSvgTextLayer = ({
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
              borderRadius: `${Math.max(0, Number(borderRadius) || 0)}px`,
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
            paddingLeft: `${Math.max(0, paddingLeft)}px`,
            paddingRight: `${Math.max(0, paddingRight)}px`,
            paddingTop: `${Math.max(0, paddingTop)}px`,
            paddingBottom: `${Math.max(0, paddingBottom)}px`,
          }}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
              if (onClick) onClick();
              else if (layerId) {
                socialSelectLayer(layerId);
                if (socialActiveTool === "text" && isSocialTextLayer(layerId)) {
                  socialOpenTextEditor(layerId);
                }
              }
            }}
            onPointerDown={(event) => {
              if (!layerId) return;
              beginSocialLayerDrag(layerId, event);
            }}
            style={{
              ...textStyle,
              ...(forceTextColor ? { color: forceTextColor } : null),
              ...(forceFontSize ? { fontSize: `${forceFontSize}px` } : null),
              ...(forceTextShadow ? { textShadow: forceTextShadow } : null),
              textAlign,
              color: forceTextColor || textStyle.color || "#ffffff",
              lineHeight: forceLineHeight ?? textStyle.lineHeight ?? 1.1,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              fontWeight,
              cursor:
                layerId && !socialLayerLocked[layerId] && socialActiveTool === "pointer"
                  ? "move"
                  : "default",
              touchAction: "none",
            }}
          >
            {content ?? String(text || "")}
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
            paddingLeft: `${Math.max(0, paddingLeft)}px`,
            paddingRight: `${Math.max(0, paddingRight)}px`,
            paddingTop: `${Math.max(0, paddingTop)}px`,
            paddingBottom: `${Math.max(0, paddingBottom)}px`,
          }}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
              if (onClick) onClick();
              else if (layerId) {
                socialSelectLayer(layerId);
                if (socialActiveTool === "text" && isSocialTextLayer(layerId)) {
                  socialOpenTextEditor(layerId);
                }
              }
            }}
            onPointerDown={(event) => {
              if (!layerId) return;
              beginSocialLayerDrag(layerId, event);
            }}
            style={{
              ...textStyle,
              ...(forceTextColor ? { color: forceTextColor } : null),
              ...(forceFontSize ? { fontSize: `${forceFontSize}px` } : null),
              ...(forceTextShadow ? { textShadow: forceTextShadow } : null),
              ...(content ? { display: "block", width: "100%" } : null),
              textAlign,
              color: forceTextColor || textStyle.color || "#ffffff",
              lineHeight: forceLineHeight ?? textStyle.lineHeight ?? 1.1,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              fontWeight,
              cursor:
                layerId && !socialLayerLocked[layerId] && socialActiveTool === "pointer"
                  ? "move"
                  : "default",
              touchAction: "none",
            }}
          >
            {content ?? String(text || "")}
          </div>
        </div>
      </div>
    );
  };

  const socialRenderPresetTextLayers = () => {
    if (socialDraft.layout_preset === "Bold headline") {
      const isAnnouncement =
        socialDraft.template_style === "Class announcement";
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
      const brandAlignX = socialFooterBrandSide === "right" ? "right" : "left";
      const brandPaddingLeft = socialFooterBrandSide === "right" ? 0 : 20;
      const brandPaddingRight = socialFooterBrandSide === "right" ? 20 : 0;
      const contactAlignX = socialFooterBrandSide === "right" ? "left" : "right";
      const contactPaddingLeft = socialFooterBrandSide === "right" ? 10 : 0;
      const contactPaddingRight = socialFooterBrandSide === "right" ? 0 : 10;
      const footerInfoText = String(socialAnnouncementFooterInfo.text ?? "");
      const footerInfoFontPt = resolveAnnouncementFooterInfoFontPt(footerInfoText);
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
          {socialRenderSvgTextLayer({
            keyId: "bold-headline",
            layerId: "headline",
            text:
              socialDraft.headline || socialSelectedProduct?.product_name || "Your headline",
            fallbackSize: isAnnouncement ? 75 : 48,
            x: 55,
            y: topY,
            width: 890,
            height: 250,
            alignX: socialToolAlignX,
            alignY: "top",
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
                fallbackSize: SOCIAL_ANNOUNCEMENT_DATE_FONT_PT,
                forceFontSize: SOCIAL_ANNOUNCEMENT_DATE_FONT_PT,
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
            ? socialRenderSvgTextLayer({
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
            : socialRenderSvgTextLayer({
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
                forceFontSize: footerInfoFontPt,
                forceTextShadow: footerInfoShadowCss,
                forceLineHeight: 1.1,
              })
            : null}
        </>
      );
    }

    if (socialDraft.layout_preset === "Band rows") {
      const rows = [
        {
          keyId: "band-headline",
          layerId: "headline",
          text: socialDraft.headline || socialSelectedProduct?.product_name || "Headline",
          fallbackSize: 24,
          y: 260,
        },
        {
          keyId: "band-start",
          layerId: "start",
          text: socialDraft.start_date || "Dates / schedule",
          fallbackSize: 20,
          y: 355,
        },
        {
          keyId: "band-audience",
          layerId: null,
          text: socialDraft.age_range || "Age range / audience",
          fallbackSize: 20,
          y: 450,
        },
        {
          keyId: "band-cta",
          layerId: "cta",
          text: socialDraft.call_to_action || "Call to action",
          fallbackSize: 20,
          y: 545,
        },
      ];
      return (
        <>
          {rows.map((row) =>
            socialRenderSvgTextLayer({
              ...row,
              x: 40,
              width: 920,
              height: 84,
              alignX: "left",
              alignY: "center",
              fontWeight: 700,
              backgroundFill: "#ff9df9",
              backgroundOpacity: 0.7,
              borderRadius: 12,
            }),
          )}
        </>
      );
    }

    if (socialDraft.layout_preset === "Photo + footer") {
      return (
        <>
          <svg
            key="photo-footer-bg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            className="absolute inset-0"
            style={{ zIndex: 17, pointerEvents: "none" }}
          >
            <rect x={0} y={760} width={1000} height={240} fill="#0b1f5f" fillOpacity={0.8} />
          </svg>
          {socialRenderSvgTextLayer({
            keyId: "photo-headline",
            layerId: "headline",
            text:
              socialDraft.headline || socialSelectedProduct?.product_name || "Program spotlight",
            fallbackSize: 28,
            x: 45,
            y: 790,
            width: 910,
            height: 105,
            alignX: "left",
            alignY: "top",
            fontWeight: 700,
          })}
          {socialRenderSvgTextLayer({
            keyId: "photo-cta",
            layerId: "cta",
            text: socialDraft.call_to_action || socialDraft.location_detail || "Join us",
            fallbackSize: 18,
            x: 45,
            y: 890,
            width: 910,
            height: 85,
            alignX: "left",
            alignY: "top",
            fontWeight: 600,
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
          {socialRenderSvgTextLayer({
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
          {socialRenderSvgTextLayer({
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

                          {socialTextEditorOpen ? (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                              <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
                                <div className="mb-2 text-sm font-semibold text-gray-800">
                                  Edit text
                                </div>
                                <textarea
                                  className="h-40 w-full rounded-xl border border-gray-200 p-3 text-sm"
                                  value={socialTextEditorValue}
                                  onChange={(e) => setSocialTextEditorValue(e.target.value)}
                                  autoFocus
                                />
                                <div className="mt-3 flex justify-end gap-2">
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-secondary !px-3 !py-1"
                                    onClick={() => setSocialTextEditorOpen(false)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-primary !px-3 !py-1"
                                    onClick={applySocialTextEditor}
                                  >
                                    Apply
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
                                  <option value="SERVICES">Service Type</option>
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
                                <Label>Extra notes</Label>
                                <Textarea
                                  rows={3}
                                  value={socialDraft.extra_notes}
                                  onChange={(e) =>
                                    setSocialDraft((prev) => ({
                                      ...prev,
                                      extra_notes: e.target.value,
                                    }))
                                  }
                                  placeholder="Any extra details you want included."
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
                                        setSocialDraft((prev) => ({
                                          ...prev,
                                          template_style: e.target.value,
                                        }))
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
                                      className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                                      value={socialDraft.layout_preset}
                                      onChange={(e) =>
                                        setSocialDraft((prev) => ({
                                          ...prev,
                                          layout_preset: e.target.value,
                                        }))
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
                                              setSocialDraft((prev) => ({
                                                ...prev,
                                                layout_preset:
                                                  item.layout_preset,
                                                aspect_ratio: item.aspect_ratio,
                                              }))
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
                                        onChange={(e) => setSocialToolColor(e.target.value)}
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
                                  <div className="mx-auto w-[75%] max-w-full">
                                    <div
                                    ref={socialPreviewRef}
                                    className={`relative w-full overflow-hidden rounded-xl border bg-gray-50 ${
                                      socialPreviewDropActive
                                        ? "border-[#ff9df9] ring-2 ring-[#ff9df9]"
                                        : "border-gray-200"
                                    } ${
                                      socialDraggingLayer
                                        ? "cursor-grabbing"
                                        : socialActiveTool === "shape"
                                          ? "cursor-crosshair"
                                          : ""
                                    }`}
                                    style={{
                                      aspectRatio: `${socialAspect.width} / ${socialAspect.height}`,
                                    }}
                                    onDragOver={socialPreviewDropHandlers.onDragOver}
                                    onDragLeave={socialPreviewDropHandlers.onDragLeave}
                                    onDrop={socialPreviewDropHandlers.onDrop}
                                    onPointerDown={onSocialPreviewPointerDown}
                                    onPointerMove={onSocialPreviewPointerMove}
                                    onPointerUp={endSocialLayerDrag}
                                    onPointerCancel={endSocialLayerDrag}
                                    onClick={() => {
                                      if (socialActiveTool === "shape") return;
                                      if (
                                        isSocialImageLayer(socialSelectedLayer) ||
                                        isSocialShapeLayer(socialSelectedLayer)
                                      ) {
                                        return;
                                      }
                                      const targetLayer = isSocialTextLayer(socialSelectedLayer)
                                        ? socialSelectedLayer
                                        : "headline";
                                      socialSelectLayer(targetLayer);
                                      if (socialActiveTool === "text") {
                                        socialOpenTextEditor(targetLayer);
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
                                                  : "default",
                                              touchAction: "none",
                                            }}
                                            onPointerDown={(event) =>
                                              beginSocialLayerDrag(layerId, event)
                                            }
                                            onClick={(event) => {
                                              event.stopPropagation();
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
                                                  layerId === SOCIAL_BRAND_LAYER_ID
                                                    ? `object-contain ${
                                                        socialFooterBrandSide === "right"
                                                          ? "object-right-bottom"
                                                          : "object-left-bottom"
                                                      }`
                                                    : "object-cover"
                                                }`}
                                              />
                                            ) : (
                                              <img
                                                src={imageMeta.url}
                                                alt=""
                                                className={`h-full w-full ${
                                                  layerId === SOCIAL_BRAND_LAYER_ID
                                                    ? `object-contain ${
                                                        socialFooterBrandSide === "right"
                                                          ? "object-right-bottom"
                                                          : "object-left-bottom"
                                                      }`
                                                    : "object-cover"
                                                }`}
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
                                                  : "default",
                                              touchAction: "none",
                                            }}
                                            onPointerDown={(event) =>
                                              beginSocialLayerDrag(layerId, event)
                                            }
                                            onClick={(event) => {
                                              event.stopPropagation();
                                              socialSelectLayer(layerId);
                                            }}
                                          />
                                        );
                                      })}
                                    {socialRenderPresetTextLayers()}
                                    {socialRenderSelectionBox(socialSelectedLayer)}
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
                                          if (
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

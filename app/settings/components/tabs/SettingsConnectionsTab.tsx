// @ts-nocheck
"use client";

export type SettingsConnectionsTabProps = {
  ctx: Record<string, any>;
};

export default function SettingsConnectionsTab({ ctx }: SettingsConnectionsTabProps) {
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

  return (
    <>
              {!loading && activeTab === "CONNECTIONS" ? (
                <div className="grid gap-4">
                  <div>
                    <div className="text-base font-semibold text-gray-900">
                      Connections
                    </div>
                    <div className="text-sm text-gray-600">
                      Add the API credentials required to publish content and
                      read inbound messages.
                    </div>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    {CONNECTION_PROVIDERS.map((provider) => {
                      const values = connections[provider.id] ?? {};
                      const snapshot = connectionSnapshots[provider.id];
                      const savedFields = snapshot?.fields ?? {};
                      const connected =
                        connectionStatusById[provider.id] ?? false;
                      const statusLabel = connected
                        ? "Connected"
                        : "Need to Establish Connection";
                      const statusTone = connected
                        ? "text-emerald-600"
                        : "text-amber-600";
                      const lastSaved = snapshot?.updated_at
                        ? new Date(snapshot.updated_at).toLocaleString()
                        : null;
                      const oauthReady = Boolean(
                        provider.oauthSupported &&
                        provider.fields
                          .filter((field) => field.required)
                          .every((field) => savedFields[field.key]?.has_value),
                      );
                      return (
                        <div
                          key={provider.id}
                          className="relative overflow-hidden rounded-xl border border-gray-200 p-4 shadow-sm"
                          style={{
                            background: connectionCardGradient(provider.id),
                          }}
                        >
                          <div className="absolute inset-0 bg-white/70" />
                          <div className="relative z-10">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex min-w-0 flex-1 flex-col gap-1">
                                <div className="text-sm font-semibold text-gray-900 leading-5">
                                  {provider.label}
                                </div>
                                <div className="text-xs text-gray-600 leading-5">
                                  {provider.description}
                                </div>
                                <div
                                  className={`text-xs font-semibold leading-5 ${statusTone}`}
                                >
                                  {statusLabel}
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 grid gap-3">
                              {provider.fields.map((field) => (
                                <div
                                  key={`${provider.id}-${field.key}`}
                                  className="grid gap-2"
                                >
                                  <Label>
                                    {field.label}
                                    {field.required ? (
                                      <span className="text-rose-500"> *</span>
                                    ) : null}
                                  </Label>
                                  <Input
                                    type={field.type ?? "text"}
                                    value={
                                      values[field.key] ??
                                      (field.type === "password"
                                        ? ""
                                        : (savedFields[field.key]?.value ?? ""))
                                    }
                                    onChange={(e) =>
                                      updateConnectionField(
                                        provider.id,
                                        field.key,
                                        e.target.value,
                                      )
                                    }
                                    placeholder={
                                      savedFields[field.key]?.has_value &&
                                      !values[field.key]
                                        ? "Saved"
                                        : field.placeholder
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                              <span>
                                {lastSaved
                                  ? `Last saved ${lastSaved}`
                                  : "Not saved yet."}
                              </span>
                              <div className="flex flex-wrap items-center gap-2">
                                {provider.oauthSupported ? (
                                  <button
                                    type="button"
                                    className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                    onClick={() =>
                                      startConnectionOAuth(provider.id)
                                    }
                                    disabled={!oauthReady}
                                    title={
                                      oauthReady
                                        ? "Start OAuth connection"
                                        : "Fill required fields and save before connecting"
                                    }
                                  >
                                    Connect
                                  </button>
                                ) : null}
                                <button
                                  type="button"
                                  className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                  onClick={() => saveConnection(provider.id)}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                    Most platforms require app review, business verification,
                    and OAuth/webhook setup before live posting or inbox
                    syncing. Save credentials here, then use Connect to complete
                    OAuth where supported.
                  </div>
                </div>
              ) : null}

    </>
  );
}

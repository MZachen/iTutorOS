// @ts-nocheck
"use client";

export type SettingsAccountTabProps = {
  ctx: Record<string, any>;
};

export default function SettingsAccountTab({ ctx }: SettingsAccountTabProps) {
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
              {!loading && activeTab === "ACCOUNT" ? (
                <div className="grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="grid gap-1">
                      <div className="text-sm text-gray-600">Logged in as</div>
                      <div className="text-base font-semibold">
                        {userEmail ?? "—"}
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm text-gray-600">
                        Organization ID
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="font-mono text-sm text-gray-500">
                          {org?.id ?? "—"}
                        </div>
                        <button
                          type="button"
                          className="flex w-fit items-center gap-2 rounded-full border border-gray-200 px-2 py-1 text-xs font-semibold text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
                          disabled={!org?.id}
                          aria-label="Copy organization id"
                          onClick={() => {
                            if (!org?.id) return;
                            void navigator.clipboard?.writeText(org.id);
                            setStatus("Organization ID copied.");
                          }}
                        >
                          <HugeiconsIcon icon={Copy01Icon} size={14} />
                          Copy ID
                        </button>
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm text-gray-600">
                        iTutorOS member since
                      </div>
                      <div className="text-base font-semibold">
                        {org?.created_at
                          ? formatDateWithPattern(org.created_at, dateFormat)
                          : "—"}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200" />

                  {!isTutorOnly ? (
                    <div className="grid gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-gray-700">
                          Plan
                        </div>
                        <button
                          type="button"
                          className="itutoros-settings-btn itutoros-settings-btn-secondary"
                          onClick={() => openBillingPortal()}
                        >
                          Manage billing
                        </button>
                      </div>
                      <div
                        className="rounded-2xl border border-gray-200 p-4 shadow-sm"
                        style={{ backgroundColor: planCardColor(planKey) }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                              Current plan
                            </div>
                            <div className="text-lg font-semibold text-[#0b1f5f]">
                              {planLabel(planKey)}
                            </div>
                          </div>
                          <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#0b1f5f]">
                            Active
                          </span>
                        </div>
                        <div className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-3">
                          {planSpecs.map((spec) => (
                            <div
                              key={spec.label}
                              className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2"
                            >
                              <div className="text-xs uppercase text-gray-400">
                                {spec.label}
                              </div>
                              <div className="text-base font-semibold text-gray-800">
                                {spec.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-3">
                        <div className="text-sm font-semibold text-gray-700">
                          Change Plan
                        </div>
                        <div className="itutoros-carousel">
                          {otherPlans.map((key) => {
                            const specs = planSpecsFor(key);
                            return (
                              <div
                                key={key}
                                className="itutoros-card-1 itutoros-carousel-card"
                                style={{ backgroundColor: planCardColor(key) }}
                              >
                                <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                  Plan
                                </div>
                                <div className="text-lg font-semibold text-[#0b1f5f]">
                                  {planLabel(key)}
                                </div>
                                <div className="mt-3 grid gap-2 text-sm text-gray-700">
                                  {specs.map((spec) => (
                                    <div
                                      key={spec.label}
                                      className="flex items-center justify-between gap-2"
                                    >
                                      <span className="text-gray-500">
                                        {spec.label}
                                      </span>
                                      <span className="font-semibold text-gray-800">
                                        {spec.value}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  className="mt-4 w-full rounded-full border border-[#0b1f5f] px-3 py-2 text-sm font-semibold text-[#0b1f5f] transition hover:bg-[#0b1f5f] hover:text-white"
                                  onClick={async () => {
                                    const accessToken =
                                      await confirmWithPassword();
                                    if (!accessToken) return;
                                    window.location.href = checkoutHrefFor(key);
                                  }}
                                >
                                  Choose {planLabel(key)}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="h-px bg-gray-200" />

                  <div className="grid gap-4">
                    <div className="text-sm font-semibold text-gray-700">
                      Account settings
                    </div>
                    <div className="grid max-w-[360px] gap-2">
                      <Label htmlFor="date-format">Date format</Label>
                      <select
                        id="date-format"
                        className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                        value={accountForm.formData.date_format}
                        onChange={(e) =>
                          accountForm.updateField(
                            "date_format",
                            normalizeDateFormat(e.target.value),
                          )
                        }
                      >
                        {DATE_FORMAT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="text-xs text-gray-500">
                        Applies across the entire app.
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                        onClick={() => sendResetEmail()}
                      >
                        Reset password
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
    </>
  );
}

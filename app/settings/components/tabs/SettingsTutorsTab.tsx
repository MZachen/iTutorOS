// @ts-nocheck
"use client";

export type SettingsTutorsTabProps = {
  ctx: Record<string, any>;
};

export default function SettingsTutorsTab({ ctx }: SettingsTutorsTabProps) {
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
              {!loading && activeTab === "TUTORS" ? (
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <div className="text-sm font-semibold">
                      Active Tutor Capacity
                    </div>
                    <div className="text-xs text-gray-600">
                      Plan limit: {tutorLimit ?? "Unlimited"} ·{" "}
                      <span
                        className={usageColorClass(
                          activeTutorCount,
                          tutorLimit ?? null,
                        )}
                      >
                        Current: {activeTutorCount}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="itutoros-settings-btn itutoros-settings-btn-success w-fit"
                      onClick={() => switchTab("ACCOUNT")}
                    >
                      Change Plan
                    </button>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-[#0b1f5f]">
                      Active Tutors
                    </h2>
                    <div className="mt-4 grid gap-3">
                      {tutors.length === 0 ? (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                          No tutors yet. Add one below and click Save.
                        </div>
                      ) : (
                        tutors.map((tutor) => {
                          const name = [
                            tutor.user?.first_name,
                            tutor.user?.last_name,
                          ]
                            .filter(Boolean)
                            .join(" ");
                          const label = name || tutor.user?.email || "Tutor";
                          return (
                            <div
                              key={tutor.id}
                              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"
                            >
                              <div>
                                <div className="text-sm font-semibold text-gray-900">
                                  {label}
                                </div>
                                {tutor.user?.email ? (
                                  <div className="text-xs text-gray-500">
                                    {tutor.user.email}
                                  </div>
                                ) : null}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-gray-600">
                                    Color
                                  </span>
                                  <input
                                    type="color"
                                    value={
                                      tutorDrafts[tutor.id] ??
                                      DEFAULT_TUTOR_COLOR
                                    }
                                    onChange={(e) =>
                                      setTutorDrafts((prev) => ({
                                        ...prev,
                                        [tutor.id]: e.target.value,
                                      }))
                                    }
                                    className="h-9 w-9 cursor-pointer rounded-md border border-gray-200 bg-white"
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="itutoros-settings-btn itutoros-settings-btn-danger"
                                  onClick={() => archiveTutor(tutor.id)}
                                >
                                  Archive
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-[#0b1f5f]">
                      Add tutor
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Add a tutor profile and assign a calendar color.
                    </p>
                    {!canAddTutor ? (
                      <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                        <span>
                          Your plan is at the tutor limit. Upgrade to add more
                          tutors.
                        </span>
                      </div>
                    ) : null}
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="new-tutor-first">First name</Label>
                        <Input
                          id="new-tutor-first"
                          value={newTutor.first_name}
                          onChange={(e) =>
                            setNewTutor((prev) => ({
                              ...prev,
                              first_name: e.target.value,
                            }))
                          }
                          disabled={!canAddTutor}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-tutor-last">Last name</Label>
                        <Input
                          id="new-tutor-last"
                          value={newTutor.last_name}
                          onChange={(e) =>
                            setNewTutor((prev) => ({
                              ...prev,
                              last_name: e.target.value,
                            }))
                          }
                          disabled={!canAddTutor}
                        />
                      </div>
                      <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="new-tutor-email">Email</Label>
                        <Input
                          id="new-tutor-email"
                          type="email"
                          placeholder="tutor@yourbusiness.com"
                          value={newTutor.email}
                          onChange={(e) =>
                            setNewTutor((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          disabled={!canAddTutor}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-tutor-color">Color</Label>
                        <input
                          id="new-tutor-color"
                          type="color"
                          value={newTutor.color_hex}
                          onChange={(e) =>
                            setNewTutor((prev) => ({
                              ...prev,
                              color_hex: e.target.value,
                            }))
                          }
                          className="h-10 w-16 cursor-pointer rounded-md border border-gray-200 bg-white"
                          disabled={!canAddTutor}
                        />
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                      Click Save to add the tutor.
                    </div>
                  </div>
                </div>
              ) : null}
    </>
  );
}

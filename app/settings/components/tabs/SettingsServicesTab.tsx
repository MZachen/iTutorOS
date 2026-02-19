// @ts-nocheck
"use client";

export type SettingsServicesTabProps = {
  ctx: Record<string, any>;
};

export default function SettingsServicesTab({ ctx }: SettingsServicesTabProps) {
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
              {!loading && activeTab === "SERVICES" ? (
                <div className="grid gap-6">
                  <div className="text-sm text-gray-600">
                    Active services appear first. Check a service to include it
                    and set an hourly price.
                  </div>

                  <div className="flex flex-wrap items-end gap-4">
                    <div className="grid gap-2">
                      <Label>Location</Label>
                      <select
                        className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                        value={selectedServiceLocationId}
                        onChange={(e) => {
                          setServiceLocationId(e.target.value);
                          setNewService((prev) => ({
                            ...prev,
                            location_id: e.target.value,
                          }));
                        }}
                      >
                        {activeLocations.length === 0 ? (
                          <option value="">—</option>
                        ) : null}
                        {activeLocations.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.location_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <div className="max-h-[520px] overflow-y-auto">
                      <table className="min-w-[720px] border-collapse text-sm md:min-w-[900px]">
                        <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                          <tr>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${serviceSort.key === "name" ? "text-[#ff9df9]" : "text-gray-900"}`}
                                onClick={() => toggleServiceSort("name")}
                              >
                                Service
                                {renderSortIcons(
                                  serviceSort.key === "name",
                                  serviceSort.dir,
                                )}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${serviceSort.key === "active" ? "text-[#ff9df9]" : "text-gray-900"}`}
                                onClick={() => toggleServiceSort("active")}
                              >
                                Included
                                {renderSortIcons(
                                  serviceSort.key === "active",
                                  serviceSort.dir,
                                )}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${serviceSort.key === "price" ? "text-[#ff9df9]" : "text-gray-900"}`}
                                onClick={() => toggleServiceSort("price")}
                              >
                                Unit price ($)
                                {renderSortIcons(
                                  serviceSort.key === "price",
                                  serviceSort.dir,
                                )}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${serviceSort.key === "unit_length" ? "text-[#ff9df9]" : "text-gray-900"}`}
                                onClick={() => toggleServiceSort("unit_length")}
                              >
                                <span>Unit length (min)</span>
                                <TooltipProvider delayDuration={200}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] font-semibold text-gray-600">
                                        i
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {UNIT_LENGTH_TOOLTIP}
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                {renderSortIcons(
                                  serviceSort.key === "unit_length",
                                  serviceSort.dir,
                                )}
                              </button>
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">
                              <button
                                type="button"
                                className={`flex items-center gap-1 whitespace-nowrap font-semibold ${serviceSort.key === "capacity" ? "text-[#ff9df9]" : "text-gray-900"}`}
                                onClick={() => toggleServiceSort("capacity")}
                              >
                                Capacity
                                {renderSortIcons(
                                  serviceSort.key === "capacity",
                                  serviceSort.dir,
                                )}
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedServiceRows.map((row) => (
                            <tr
                              key={row.key}
                              className="border-t border-gray-100"
                            >
                              <td className="px-3 py-2 font-medium">
                                <ClampedCell text={row.name} />
                              </td>
                              <td className="px-3 py-2">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 accent-[#0b1f5f]"
                                  checked={row.is_active}
                                  onChange={(e) =>
                                    updateServiceDraft(row, {
                                      is_active: e.target.checked,
                                    })
                                  }
                                />
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <Input
                                    inputMode="decimal"
                                    value={row.hourly_rate_dollars}
                                    onChange={(e) =>
                                      updateServiceDraft(row, {
                                        hourly_rate_dollars: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  inputMode="numeric"
                                  value={row.unit_length_minutes}
                                  onChange={(e) =>
                                    updateServiceDraft(row, {
                                      unit_length_minutes: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  type="number"
                                  min={1}
                                  value={row.capacity}
                                  onChange={(e) =>
                                    updateServiceDraft(row, {
                                      capacity: e.target.value,
                                    })
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <form
                    onSubmit={addService}
                    className="grid w-full max-w-[720px] gap-3 rounded-xl border border-gray-200 p-4"
                  >
                    <div className="text-sm font-semibold">
                      Add a new service
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label>Location</Label>
                        <select
                          className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                          value={newService.location_id}
                          onChange={(e) =>
                            setNewService((prev) => ({
                              ...prev,
                              location_id: e.target.value,
                            }))
                          }
                        >
                          <option value="">—</option>
                          {activeLocations.map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.location_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2 sm:col-span-2">
                        <Label>Service name</Label>
                        <Input
                          value={newService.name}
                          onChange={(e) =>
                            setNewService((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label>Unit price ($)</Label>
                        <Input
                          inputMode="decimal"
                          value={newService.price}
                          onChange={(e) =>
                            setNewService((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label className="flex items-center gap-2">
                          <span>Unit length (min)</span>
                          <TooltipProvider delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] font-semibold text-gray-600">
                                  i
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {UNIT_LENGTH_TOOLTIP}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <Input
                          inputMode="numeric"
                          value={newService.unit_length_minutes}
                          onChange={(e) =>
                            setNewService((prev) => ({
                              ...prev,
                              unit_length_minutes: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Capacity</Label>
                        <Input
                          type="number"
                          min={1}
                          value={newService.capacity}
                          onChange={(e) =>
                            setNewService((prev) => ({
                              ...prev,
                              capacity: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="itutoros-settings-btn itutoros-settings-btn-success"
                        >
                          Add service
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
    </>
  );
}
